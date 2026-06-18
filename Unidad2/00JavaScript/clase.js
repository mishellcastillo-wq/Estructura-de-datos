/*
CLASES EN JAVASCRIPT
*/

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre
        this.edad = edad
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`)
    }

    esMayorDeEdad() {
        return this.edad >= 18
    }
}

const persona1 = new Persona("Mishell", 18)
persona1.saludar()
console.log(persona1.esMayorDeEdad())
/*
¿Qué es POO?
La Programación Orientada a Objetos organiza el código en objetos que combinan datos (propiedades) 
y comportamiento (métodos), en lugar de funciones y variables sueltas. 
Se basa en 4 pilares: abstracción (modelar solo lo relevante, como Persona con solo nombre y edad), 
encapsulamiento (ocultar detalles internos, como #saldo), 
herencia (una clase reutiliza otra con extends/super, como Estudiante heredando de Persona) 
y polimorfismo (un mismo método se comporta distinto según el objeto, como saludar() en Persona vs Estudiante).
*/

// HERENCIA
class Estudiante extends Persona {
    constructor(nombre, edad, carrera) {
        super(nombre, edad)
        this.carrera = carrera
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}, estudio ${this.carrera}`)
    }
}

const estudiante1 = new Estudiante("Ana", 21, "Pedagogía")
estudiante1.saludar() // Hola, soy Ana, estudio Pedagogía

