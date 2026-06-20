// Guarda el historial de acciones del carrito (agregar/quitar)
// para poder deshacer la ÚLTIMA acción realizada (LIFO).

class PilaAcciones {
    constructor() {
      this.acciones = []; // arreglo usado como pila
    }
  
    // Guarda una nueva acción en el tope de la pila
    push(accion) {
      this.acciones.push(accion);
    }
  
    // Saca y devuelve la última acción registrada (LIFO)
    pop() {
      if (this.estaVacia()) {
        return null;
      }
      return this.acciones.pop(); // quita y devuelve el último elemento
    }
  
    // Mira la última acción sin quitarla
    peek() {
      if (this.estaVacia()) return null;
      return this.acciones[this.acciones.length - 1];
    }
  
    estaVacia() {
      return this.acciones.length === 0;
    }
  
    tamanio() {
      return this.acciones.length;
    }
  
    limpiar() {
      this.acciones = [];
    }
  }
  
  module.exports = PilaAcciones;