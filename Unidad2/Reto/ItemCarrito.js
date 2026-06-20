class ItemCarrito {
    constructor(producto, cantidad) {
      this.producto = producto;
      this.cantidad = cantidad;
    }
  
    subtotal() {
      return this.producto.precio * this.cantidad;
    }
  
    toString() {
      return `${this.producto.nombre} x${this.cantidad} = $${this.subtotal().toFixed(2)}`;
    }
  }
  
  module.exports = ItemCarrito;