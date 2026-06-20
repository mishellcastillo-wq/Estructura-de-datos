const ItemCarrito = require('./ItemCarrito');
const PilaAcciones = require('./PilaAcciones');

// Gestiona los productos agregados, reduciendo el stock del
// inventario en tiempo real y restaurándolo si se quitan items.
// Además mantiene una PILA (LIFO) de acciones para poder
// deshacer la última operación realizada.

class Carrito {
  constructor() {
    this.items = [];              // lista de ItemCarrito (acceso por ID)
    this.historial = new PilaAcciones(); // LIFO: pila de acciones
  }

  //  Agregar producto al carrito 
  agregarProducto(producto, cantidad) {
    if (cantidad <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    if (!producto.hayStock(cantidad)) {
      console.log(`✗ No se puede agregar "${producto.nombre}": stock insuficiente (disponible: ${producto.stock})`);
      return false;
    }

    const itemExistente = this.items.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push(new ItemCarrito(producto, cantidad));
    }

    producto.reducirStock(cantidad);

    // Registra la acción en la pila para poder deshacerla despues
    this.historial.push({
      tipo: 'agregar',
      producto: producto,
      cantidad: cantidad
    });

    console.log(`✓ Agregado: ${producto.nombre} x${cantidad}`);
    return true;
  }

  //  Quitar producto del carrito
  quitarProducto(idProducto, cantidad) {
    const item = this.items.find(item => item.producto.id === idProducto);

    if (!item) {
      console.log(`✗ El producto con ID ${idProducto} no está en el carrito`);
      return false;
    }

    const cantidadAQuitar = Math.min(cantidad, item.cantidad);

    if (cantidad >= item.cantidad) {
      item.producto.restaurarStock(item.cantidad);
      this.items = this.items.filter(i => i.producto.id !== idProducto);
      console.log(`✓ Eliminado del carrito: ${item.producto.nombre}`);
    } else {
      item.cantidad -= cantidad;
      item.producto.restaurarStock(cantidad);
      console.log(`✓ Reducido: ${item.producto.nombre} ahora x${item.cantidad}`);
    }

    // Registra la accion en la pila para poder deshacerla despues
    this.historial.push({
      tipo: 'quitar',
      producto: item.producto,
      cantidad: cantidadAQuitar
    });

    return true;
  }

  // DESHACER (LIFO) 
  // Saca la ultima accion de la pila y hace lo contrario de lo que hizo.
  // Si la ultima accion fue "agregar" -> se quita esa cantidad.
  // Si la ultima accion fue "quitar"  -> se vuelve a agregar esa cantidad.
  deshacer() {
    const ultimaAccion = this.historial.pop(); // LIFO: la mas reciente

    if (!ultimaAccion) {
      console.log('No hay acciones para deshacer');
      return false;
    }

    if (ultimaAccion.tipo === 'agregar') {
      // Revertir un "agregar" = quitar esa cantidad, SIN registrar
      // una nueva accion en el historial (evita ciclos)
      this._quitarSinRegistrar(ultimaAccion.producto.id, ultimaAccion.cantidad);
      console.log(`↩ Deshecho: se quitó ${ultimaAccion.producto.nombre} x${ultimaAccion.cantidad}`);
    } else if (ultimaAccion.tipo === 'quitar') {
      // Revertir un "quitar" = volver a agregar esa cantidad
      this._agregarSinRegistrar(ultimaAccion.producto, ultimaAccion.cantidad);
      console.log(`↩ Deshecho: se volvió a agregar ${ultimaAccion.producto.nombre} x${ultimaAccion.cantidad}`);
    }

    return true;
  }

  // Version interna de agregar que NO registra en el historial
  _agregarSinRegistrar(producto, cantidad) {
    const itemExistente = this.items.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push(new ItemCarrito(producto, cantidad));
    }
    producto.reducirStock(cantidad);
  }

  // Version interna de quitar que NO registra en el historial
  _quitarSinRegistrar(idProducto, cantidad) {
    const item = this.items.find(item => item.producto.id === idProducto);
    if (!item) return;

    if (cantidad >= item.cantidad) {
      item.producto.restaurarStock(item.cantidad);
      this.items = this.items.filter(i => i.producto.id !== idProducto);
    } else {
      item.cantidad -= cantidad;
      item.producto.restaurarStock(cantidad);
    }
  }

  // Vaciar el carrito completo (restaura todo el stock)
  vaciarCarrito() {
    this.items.forEach(item => {
      item.producto.restaurarStock(item.cantidad);
    });
    this.items = [];
    this.historial.limpiar(); // ya no tiene sentido deshacer tras vaciar todo
    console.log('✓ Carrito vaciado, stock restaurado');
  }

  // Calcular el total a pagar
  calcularTotal() {
    return this.items.reduce((total, item) => total + item.subtotal(), 0);
  }

  // Finalizar compra (el stock ya fue descontado)
  finalizarCompra() {
    if (this.items.length === 0) {
      console.log('El carrito está vacío, no hay nada que comprar');
      return null;
    }

    const total = this.calcularTotal();
    console.log('\n=== RESUMEN DE COMPRA ===');
    this.items.forEach(item => console.log('  ' + item.toString()));
    console.log(`TOTAL: $${total.toFixed(2)}`);
    console.log('=========================\n');

    this.items = [];
    this.historial.limpiar(); // ya no se puede deshacer una compra finalizada
    return total;
  }

  mostrarCarrito() {
    if (this.items.length === 0) {
      console.log('Carrito vacío');
      return;
    }
    console.log('\n--- CARRITO ---');
    this.items.forEach(item => console.log('  ' + item.toString()));
    console.log('---------------\n');
  }
}

module.exports = Carrito;