// Representa a un pasajero del aeropuerto con sus datos básicos
// y el estado de su proceso (check-in y abordaje).

class Pasajero {
    constructor(id, nombre, vuelo, clase = "Económica") {
      this.id = id;
      this.nombre = nombre;
      this.vuelo = vuelo;
      this.clase = clase; // "Económica" o "Preferente"
      this.horaLlegada = new Date();
    }
  
    toString() {
      return `[${this.id}] ${this.nombre} | Vuelo ${this.vuelo} | ${this.clase}`;
    }
  }
  
  module.exports = Pasajero;