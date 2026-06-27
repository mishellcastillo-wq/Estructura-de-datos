// A diferencia de una cola simple (que usa push/shift sobre un
// array dinámico), esta implementación usa un ARRAY DE TAMAÑO FIJO
// con DOS PUNTEROS (inicio y fin) que avanzan en módulo (%) sobre
// la capacidad del array. Esto permite RECICLAR el espacio que deja
// libre cada elemento que sale, sin necesidad de reindexar todo el
// array (lo que sí hace .shift() internamente, costando O(n)).
//
// Principio FIFO: el primer elemento en ENCOLAR es el primero en
// DESENCOLAR — el puntero 'inicio' siempre apunta al elemento más
// antiguo que sigue esperando.

class ColaCircular {
    constructor(capacidad) {
      this.capacidad = capacidad;
      this.datos = new Array(capacidad).fill(null); // array de tamaño FIJO
      this.inicio = 0;   // puntero al primer elemento (el más antiguo)
      this.fin = 0;      // puntero a la próxima posición libre para encolar
      this.total = 0;    // cantidad de elementos actualmente en la cola
    }
  
    estaVacia() {
      return this.total === 0;
    }
  
    estaLlena() {
      return this.total === this.capacidad;
    }
  
    // Encolar (Enqueue) — O(1)
    // Inserta en la posición 'fin' y avanza el puntero de forma
    // CIRCULAR usando el operador módulo (%). Cuando 'fin' llega al
    // final del array, vuelve a 0 en lugar de seguir creciendo,
    // reciclando así las posiciones que ya quedaron libres.
    encolar(elemento) {
      if (this.estaLlena()) {
        return false; // la cola no tiene espacio disponible
      }
      this.datos[this.fin] = elemento;
      this.fin = (this.fin + 1) % this.capacidad; // avance circular
      this.total++;
      return true;
    }
  
    // Desencolar (Dequeue) — O(1)
    // Extrae el elemento en la posición 'inicio' y avanza ese puntero
    // de forma circular. La posición que queda libre será reutilizada
    // automáticamente la próxima vez que el puntero 'fin' vuelva a
    // pasar por ahí — esto es exactamente el "reciclaje de memoria".
    desencolar() {
      if (this.estaVacia()) {
        return null;
      }
      const elemento = this.datos[this.inicio];
      this.datos[this.inicio] = null; // libera la referencia
      this.inicio = (this.inicio + 1) % this.capacidad; // avance circular
      this.total--;
      return elemento;
    }
  
    // Ver el frente sin extraerlo (Peek)
    verFrente() {
      if (this.estaVacia()) return null;
      return this.datos[this.inicio];
    }
  
    tamanio() {
      return this.total;
    }
  
    // Recorre la cola en orden lógico (de inicio a fin)
    // Aunque internamente los datos pueden estar "partidos" entre el
    // final y el inicio del array físico, este método siempre devuelve
    // el orden FIFO real, sin exponer la complejidad interna.
    verTodos() {
      const resultado = [];
      for (let i = 0; i < this.total; i++) {
        const indiceReal = (this.inicio + i) % this.capacidad;
        resultado.push(this.datos[indiceReal]);
      }
      return resultado;
    }
  }
  
  module.exports = ColaCircular;