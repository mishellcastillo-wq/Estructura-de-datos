class Producto {
    constructor(id, nombre, precio, stock) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
    }
  
    hayStock(cantidad) {
      return this.stock >= cantidad;
    }
  
    reducirStock(cantidad) {
      if (!this.hayStock(cantidad)) {
        throw new Error(
          `Stock insuficiente para "${this.nombre}". Disponible: ${this.stock}, solicitado: ${cantidad}`
        );
      }
      this.stock -= cantidad;
    }
  
    restaurarStock(cantidad) {
      this.stock += cantidad;
    }
  
    toString() {
      return `${this.nombre} | $${this.precio.toFixed(2)} | Stock: ${this.stock}`;
    }
  }
  
  module.exports = Producto;