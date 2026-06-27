const SistemaAeropuerto = require('./SistemaAeropuerto');

console.log('========================================');
console.log('  SISTEMA DE CHECK-IN Y ABORDAJE (FIFO)');
console.log('========================================\n');

const sistema = new SistemaAeropuerto('LA-2045');

// Etapa 1: Llegan los pasajeros al mostrador
console.log('--- LLEGADA DE PASAJEROS AL MOSTRADOR ---');
sistema.llegarAMostrador('Ana Torres', 'Económica');
sistema.llegarAMostrador('Luis Vera', 'Económica');
sistema.llegarAMostrador('Carla Mora', 'Preferente');
sistema.llegarAMostrador('Diego Paz', 'Económica');
console.log(`Pasajeros en cola de Check-in: ${sistema.colaCheckIn.tamanio()}\n`);

// Etapa 2: Se procesa el check-in en orden FIFO
console.log('--- PROCESANDO CHECK-IN (FIFO) ---');
let p;
while ((p = sistema.procesarCheckIn()) !== null) {
  console.log(`✓ Check-in completado: ${p.toString()}`);
}
console.log();

// Estado intermedio
console.log('--- COLA DE ABORDAJE (orden resultante) ---');
sistema.colaAbordaje.verTodos().forEach((pasajero, i) => {
  console.log(`  ${i + 1}. ${pasajero.toString()}`);
});
console.log();

// Etapa 3: Se llama a abordar en orden FIFO
console.log('--- LLAMANDO A ABORDAR (FIFO) ---');
while ((p = sistema.procesarAbordaje()) !== null) {
  console.log(`✈ Abordando: ${p.toString()}`);
}

console.log('\n--- ESTADO FINAL ---');
console.log(sistema.obtenerEstado());