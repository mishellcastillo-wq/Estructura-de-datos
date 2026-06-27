  // LÓGICA DE NEGOCIO 

  class Pasajero {
    constructor(id, nombre, vuelo, clase = "Económica") {
      this.id = id;
      this.nombre = nombre;
      this.vuelo = vuelo;
      this.clase = clase;
    }
  }

  class ColaCircular {
    constructor(capacidad) {
      this.capacidad = capacidad;
      this.datos = new Array(capacidad).fill(null);
      this.inicio = 0;
      this.fin = 0;
      this.total = 0;
    }
    estaVacia() { return this.total === 0; }
    estaLlena() { return this.total === this.capacidad; }
    encolar(elemento) {
      if (this.estaLlena()) return false;
      this.datos[this.fin] = elemento;
      this.fin = (this.fin + 1) % this.capacidad;
      this.total++;
      return true;
    }
    desencolar() {
      if (this.estaVacia()) return null;
      const elemento = this.datos[this.inicio];
      this.datos[this.inicio] = null;
      this.inicio = (this.inicio + 1) % this.capacidad;
      this.total--;
      return elemento;
    }
    verFrente() {
      if (this.estaVacia()) return null;
      return this.datos[this.inicio];
    }
    tamanio() { return this.total; }
    verTodos() {
      const resultado = [];
      for (let i = 0; i < this.total; i++) {
        const indiceReal = (this.inicio + i) % this.capacidad;
        resultado.push(this.datos[indiceReal]);
      }
      return resultado;
    }
  }

  class SistemaAeropuerto {
    constructor(numeroVuelo, capacidad = 20) {
      this.numeroVuelo = numeroVuelo;
      this.capacidad = capacidad;
      this.colaCheckIn = new ColaCircular(capacidad);
      this.colaAbordaje = new ColaCircular(capacidad);
      this.pasajerosAbordados = [];
      this.contadorId = 1;
    }

    llegarAMostrador(nombre, clase = "Económica") {
      const pasajero = new Pasajero(this.contadorId++, nombre, this.numeroVuelo, clase);
      const exito = this.colaCheckIn.encolar(pasajero);
      if (!exito) return null;
      return pasajero;
    }

    procesarCheckIn() {
      const pasajero = this.colaCheckIn.desencolar();
      if (!pasajero) return null;

      if (pasajero.clase === "Preferente") {
        this._encolarConPrioridad(pasajero);
      } else {
        this.colaAbordaje.encolar(pasajero);
      }
      return pasajero;
    }

    _encolarConPrioridad(pasajero) {
      const actuales = this.colaAbordaje.verTodos();
      const ultimoPreferenteIdx = actuales.map(p => p.clase).lastIndexOf("Preferente");
      const posicionDestino = ultimoPreferenteIdx === -1 ? 0 : ultimoPreferenteIdx + 1;

      actuales.splice(posicionDestino, 0, pasajero);

      this.colaAbordaje = new ColaCircular(this.capacidad);
      actuales.forEach(p => this.colaAbordaje.encolar(p));
    }

    procesarAbordaje() {
      if (this.pasajerosAbordados.length >= this.capacidad) {
        return null; // avión lleno: aforo máximo alcanzado
      }
      const pasajero = this.colaAbordaje.desencolar();
      if (!pasajero) return null;
      this.pasajerosAbordados.push(pasajero);
      return pasajero;
    }
  }

  // CAPA DE PRESENTACIÓN

  const sistema = new SistemaAeropuerto('LA-2045');

  function mostrarFeedback(mensaje) {
    const banner = document.getElementById('feedback-banner');
    banner.innerHTML = mensaje;
    banner.classList.add('show');
    clearTimeout(banner._timeout);
    banner._timeout = setTimeout(() => banner.classList.remove('show'), 3200);
  }

  function log(mensajeHtml) {
    const container = document.getElementById('log-container');
    const line = document.createElement('div');
    line.className = 'log-line';
    const hora = new Date().toLocaleTimeString('es-EC', { hour12: false });
    line.innerHTML = `<span class="mono">[${hora}]</span> ${mensajeHtml}`;
    container.prepend(line);
  }

  function crearTarjeta(pasajero, esFrente) {
    const div = document.createElement('div');
    div.className = 'pass-card' + (pasajero.clase === 'Preferente' ? ' preferente' : '');
    div.innerHTML = `
      <span class="pass-id mono">#${pasajero.id}</span>
      <div class="pass-info">
        <div class="pass-name">${pasajero.nombre}</div>
        <div class="pass-class ${pasajero.clase === 'Preferente' ? 'preferente' : ''}">${pasajero.clase}</div>
      </div>
      ${esFrente ? '<span class="badge-front">Siguiente en fila</span>' : ''}
    `;
    return div;
  }

  function renderizarPunteros() {
    const cola = sistema.colaCheckIn;
    document.getElementById('ptr-capacidad').textContent = cola.capacidad;
    document.getElementById('ptr-inicio').textContent = cola.inicio;
    document.getElementById('ptr-fin').textContent = cola.fin;
    document.getElementById('ptr-ocupacion').textContent = `${cola.total}/${cola.capacidad}`;

    const visual = document.getElementById('ptr-array-visual');
    visual.innerHTML = '';
    for (let i = 0; i < cola.capacidad; i++) {
      const celda = document.createElement('div');
      const ocupada = cola.datos[i] !== null;
      let estiloExtra = 'background:#1B324A; border:1px solid #234158; color:#7C93A8;';
      let marca = '';
      if (i === cola.inicio && i === cola.fin && cola.total > 0) {
        estiloExtra = 'background:rgba(255,182,39,0.15); border:2px solid #FFB627; color:#FFB627;';
        marca = 'I/F';
      } else if (i === cola.inicio && cola.total > 0) {
        estiloExtra = 'background:rgba(61,220,132,0.15); border:2px solid #3DDC84; color:#3DDC84;';
        marca = 'inicio';
      } else if (i === cola.fin) {
        estiloExtra = 'background:rgba(185,142,255,0.15); border:2px solid #B98EFF; color:#B98EFF;';
        marca = 'fin';
      } else if (ocupada) {
        estiloExtra = 'background:#1B324A; border:1px solid #3DDC84; color:#EAF2F8;';
      }
      celda.style.cssText = `width:34px; height:34px; border-radius:5px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:9px; font-family:'JetBrains Mono',monospace; ${estiloExtra}`;
      celda.innerHTML = `<div style="font-size:10px; font-weight:700;">${i}</div>${marca ? `<div style="font-size:7px;">${marca}</div>` : ''}`;
      celda.title = ocupada ? `Posición ${i}: ocupada` : `Posición ${i}: libre`;
      visual.appendChild(celda);
    }
  }

  function renderizar() {
    const checkinItems = sistema.colaCheckIn.verTodos();
    const checkinBody = document.getElementById('cola-checkin');
    checkinBody.innerHTML = '';
    if (checkinItems.length === 0) {
      checkinBody.innerHTML = '<div class="empty-state">Aún no hay pasajeros.<br>Usa el Paso 1 arriba para registrar uno.</div>';
    } else {
      checkinItems.forEach((p, i) => checkinBody.appendChild(crearTarjeta(p, i === 0)));
    }
    document.getElementById('count-checkin').textContent = checkinItems.length;
    document.getElementById('btn-checkin').disabled = checkinItems.length === 0;

    const abordajeItems = sistema.colaAbordaje.verTodos();
    const abordajeBody = document.getElementById('cola-abordaje');
    abordajeBody.innerHTML = '';
    if (abordajeItems.length === 0) {
      abordajeBody.innerHTML = '<div class="empty-state">Aún no hay pasajeros aquí.<br>Primero completa el Check-in (Paso 2).</div>';
    } else {
      abordajeItems.forEach((p, i) => abordajeBody.appendChild(crearTarjeta(p, i === 0)));
    }
    document.getElementById('count-abordaje').textContent = abordajeItems.length;
    const avionLleno = sistema.pasajerosAbordados.length >= sistema.capacidad;
    document.getElementById('btn-abordaje').disabled = abordajeItems.length === 0 || avionLleno;

    const boardedSection = document.getElementById('boarded-section');
    const summary = document.getElementById('boarded-summary');
    document.getElementById('aforo-contador').textContent = `${sistema.pasajerosAbordados.length}/${sistema.capacidad}`;
    boardedSection.style.display = 'block';
    if (sistema.pasajerosAbordados.length === 0) {
      summary.innerHTML = '<span style="color: var(--text-secondary); font-size: 12px;">Aún no hay pasajeros abordados.</span>';
    } else {
      boardedSection.style.display = 'block';
      summary.innerHTML = '';
      sistema.pasajerosAbordados.forEach(p => {
        const chip = document.createElement('span');
        chip.className = 'boarded-chip mono';
        chip.textContent = `#${p.id} ${p.nombre}`;
        summary.appendChild(chip);
      });
    }

    renderizarPunteros();
  }

  function agregarPasajero() {
    const inputNombre = document.getElementById('input-nombre');
    const inputClase = document.getElementById('input-clase');
    const nombre = inputNombre.value.trim();

    if (!nombre) {
      inputNombre.focus();
      return;
    }

    const pasajero = sistema.llegarAMostrador(nombre, inputClase.value);
    log(`<span class="tag">Llegada</span> #${pasajero.id} ${pasajero.nombre} se unió al mostrador (${pasajero.clase})`);
    mostrarFeedback(`✓ ${pasajero.nombre} fue añadido al final de la fila de Check-in. Ahora presiona "Procesar siguiente Check-in" cuando estés listo.`);
    inputNombre.value = '';
    inputNombre.focus();
    renderizar();
  }

  function ejecutarCheckIn() {
    const pasajero = sistema.procesarCheckIn();
    if (!pasajero) return;
    log(`<span class="tag">Check-in</span> completado para #${pasajero.id} ${pasajero.nombre}`);
    mostrarFeedback(`✓ ${pasajero.nombre} terminó el Check-in y pasó a la Puerta de Abordaje.`);
    renderizar();
  }

  function ejecutarAbordaje() {
    if (sistema.pasajerosAbordados.length >= sistema.capacidad) {
      mostrarFeedback(`✗ El avión alcanzó su aforo máximo de ${sistema.capacidad} pasajeros. No se permiten más abordajes.`);
      return;
    }
    const pasajero = sistema.procesarAbordaje();
    if (!pasajero) return;
    log(`<span class="tag board">Abordó</span> #${pasajero.id} ${pasajero.nombre} ✈`);
    mostrarFeedback(`✈ ${pasajero.nombre} abordó el avión correctamente.`);
    renderizar();
  }

  document.getElementById('input-nombre').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') agregarPasajero();
  });

  renderizar();
  log('Sistema inicializado — vuelo LA-2045 listo para recibir pasajeros');