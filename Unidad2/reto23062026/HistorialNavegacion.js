const Pila = require('./Pila');

// Simula el historial de navegación de un navegador web.
// Cada página visitada se apila; el botón "Atrás" saca la página
// actual y regresa a la anterior — comportamiento LIFO,
// igual al historial real de Chrome, Firefox, etc.

class HistorialNavegacion {
  constructor(paginaInicial) {
    this.historial = new Pila();   // pila de páginas visitadas
    this.actual = paginaInicial;   // página que se está viendo ahora
    this.historial.push(paginaInicial);
  }

  // Navegar a una nueva página
  visitar(url) {
    this.historial.push(url);
    this.actual = url;
    console.log(`→ Visitando: ${url}`);
  }

  // Botón "Atrás" (LIFO)
  // Saca la página actual de la pila y regresa a la anterior.
  atras() {
    if (this.historial.tamanio() <= 1) {
      console.log('✗ No hay páginas anteriores en el historial');
      return null;
    }

    this.historial.pop();              // descarta la página actual
    this.actual = this.historial.peek(); // la nueva "actual" es la anterior
    console.log(`← Regresando a: ${this.actual}`);
    return this.actual;
  }

  // Ver la página actual
  paginaActual() {
    return this.actual;
  }

  // Mostrar todo el historial (de la más antigua a la más reciente)
  mostrarHistorial() {
    console.log('\n--- HISTORIAL DE NAVEGACIÓN ---');
    const paginas = this.historial.verTodos();
    paginas.forEach((url, i) => {
      const marca = (i === paginas.length - 1) ? ' ← actual' : '';
      console.log(`  [${i}] ${url}${marca}`);
    });
    console.log('-------------------------------\n');
  }
}

module.exports = HistorialNavegacion;