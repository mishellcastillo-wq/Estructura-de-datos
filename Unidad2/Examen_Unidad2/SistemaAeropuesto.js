const ColaCircular = require('./ColaCircular');
const Pasajero = require('./Pasajero');

// Gestiona el flujo completo de un pasajero: llega -> hace check-in
// -> espera abordaje -> aborda. Usa DOS Colas Circulares FIFO
// independientes, una para cada etapa, porque cada etapa tiene su
// propio orden de llegada (el orden de check-in no necesariamente
// es el mismo orden en que los pasajeros llegan a la puerta de
// abordaje, por la regla de prioridad de clase Preferente).

class SistemaAeropuerto {
  constructor(numeroVuelo, capacidad = 50) {
    this.numeroVuelo = numeroVuelo;
    this.capacidadAvion = capacidad; // aforo máximo del vuelo
    this.colaCheckIn = new ColaCircular(capacidad);
    this.colaAbordaje = new ColaCircular(capacidad);
    this.pasajerosAbordados = [];
    this.contadorId = 1;
  }

  // Etapa 1: Llegada al mostrador
  llegarAMostrador(nombre, clase = "Económica") {
    const pasajero = new Pasajero(this.contadorId++, nombre, this.numeroVuelo, clase);
    const exito = this.colaCheckIn.encolar(pasajero);
    if (!exito) {
      console.log(`✗ Mostrador lleno, no se pudo registrar a ${nombre}`);
      return null;
    }
    return pasajero;
  }

  // Procesar Check-in (FIFO)
  procesarCheckIn() {
    const pasajero = this.colaCheckIn.desencolar();
    if (!pasajero) return null;

    // Pasajeros Preferente se insertan al frente de su propio
    // sub-grupo dentro de la cola de abordaje (regla de negocio).
    if (pasajero.clase === "Preferente") {
      this._encolarConPrioridad(pasajero);
    } else {
      this.colaAbordaje.encolar(pasajero);
    }
    return pasajero;
  }

  // Inserta un pasajero preferente después del último preferente ya
  // encolado, manteniendo FIFO dentro de cada grupo de prioridad.
  _encolarConPrioridad(pasajero) {
    const actuales = this.colaAbordaje.verTodos();
    const ultimoPreferenteIdx = actuales.map(p => p.clase).lastIndexOf("Preferente");
    const posicionDestino = ultimoPreferenteIdx === -1 ? 0 : ultimoPreferenteIdx + 1;

    actuales.splice(posicionDestino, 0, pasajero);

    // Se reconstruye la cola circular completa en el nuevo orden.
    // (operación O(n), aceptable porque la prioridad es un caso
    // especial poco frecuente frente al flujo FIFO normal)
    const capacidad = this.colaAbordaje.capacidad;
    this.colaAbordaje = new ColaCircular(capacidad);
    actuales.forEach(p => this.colaAbordaje.encolar(p));
  }

  // Procesar Abordaje (FIFO)
  // El avión tiene un aforo máximo (capacidadAvion). Una vez alcanzado,
  // ningún pasajero más puede abordar, sin importar que aún haya
  // espacio físico en la cola circular de abordaje.
  procesarAbordaje() {
    if (this.pasajerosAbordados.length >= this.capacidadAvion) {
      console.log(`✗ Avión lleno (aforo máximo: ${this.capacidadAvion}). No se permiten más abordajes.`);
      return null;
    }

    const pasajero = this.colaAbordaje.desencolar();
    if (!pasajero) return null;
    this.pasajerosAbordados.push(pasajero);
    return pasajero;
  }

  obtenerEstado() {
    return {
      vuelo: this.numeroVuelo,
      enCheckIn: this.colaCheckIn.tamanio(),
      enAbordaje: this.colaAbordaje.tamanio(),
      abordados: this.pasajerosAbordados.length,
      capacidadAvion: this.capacidadAvion
    };
  }
}

module.exports = SistemaAeropuerto;