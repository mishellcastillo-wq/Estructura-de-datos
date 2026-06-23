const HistorialNavegacion = require('./HistorialNavegacion');

console.log('=== SIMULACIÓN: HISTORIAL DE NAVEGACIÓN (PILA - LIFO) ===\n');

// El usuario abre el navegador en la página de inicio
const navegador = new HistorialNavegacion('inicio.com');

// El usuario navega por varias páginas
navegador.visitar('inicio.com/productos');
navegador.visitar('inicio.com/productos/laptop-123');
navegador.visitar('inicio.com/carrito');

navegador.mostrarHistorial();

console.log('Página actual:', navegador.paginaActual());
console.log();

// El usuario presiona "Atrás" dos veces
console.log('--- El usuario presiona "Atrás" ---');
navegador.atras();
navegador.atras();

navegador.mostrarHistorial();

// El usuario visita una página nueva desde donde quedó
console.log('--- El usuario visita una nueva página ---');
navegador.visitar('inicio.com/ofertas');

navegador.mostrarHistorial();

// El usuario sigue retrocediendo hasta el final del historial
console.log('--- Retrocediendo hasta el inicio ---');
navegador.atras();
navegador.atras();
navegador.atras(); // ya no hay más páginas anteriores

navegador.mostrarHistorial();