// El último elemento en entrar
// es el primero en salir (Last In, First Out).

class Pila {
    constructor() {
      this.elementos = [];
    }
  
    // Agrega un elemento al tope de la pila
    push(elemento) {
      this.elementos.push(elemento);
    }
  
    // Saca y devuelve el elemento del tope (el más reciente)
    pop() {
      if (this.estaVacia()) {
        return null;
      }
      return this.elementos.pop();
    }
  
    // Mira el elemento del tope sin sacarlo
    peek() {
      if (this.estaVacia()) return null;
      return this.elementos[this.elementos.length - 1];
    }
  
    estaVacia() {
      return this.elementos.length === 0;
    }
  
    tamanio() {
      return this.elementos.length;
    }
  
    // Devuelve una copia de todos los elementos (solo lectura)
    verTodos() {
      return [...this.elementos];
    }
  }
  
  module.exports = Pila;