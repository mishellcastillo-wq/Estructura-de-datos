const Producto = require('./Producto');
const Carrito = require('./Carrito');

console.log('========================================');
console.log('       TIENDA - CARRITO DE COMPRAS');
console.log('========================================\n');

// Inventario de la tienda
const productos = [
  new Producto(1, 'Laptop', 850.00, 5),
  new Producto(2, 'Mouse', 15.50, 20),
  new Producto(3, 'Teclado', 35.00, 8),
  new Producto(4, 'Monitor', 220.00, 3),
];

const carrito = new Carrito();

// El cliente va agregando productos a su carrito
carrito.agregarProducto(productos[0], 1); // 1 Laptop
carrito.agregarProducto(productos[1], 2); // 2 Mouse
carrito.agregarProducto(productos[2], 1); // 1 Teclado

// El cliente se equivoca y agrega un Monitor de más
carrito.agregarProducto(productos[3], 2);

// Se da cuenta del error y deshace esa última acción
console.log('\nEl cliente decide deshacer la última acción...');
carrito.deshacer();

// El cliente agrega lo que realmente quería
carrito.agregarProducto(productos[3], 1); // solo 1 Monitor

// Carrito final con el total a pagar
carrito.mostrarCarrito();

// Finalizar la compra
carrito.finalizarCompra();