function sumaDigitos(n) {
    if (n === 0) {
        return 0; // Caso Base
    }
    return (n % 10) + sumaDigitos(Math.floor(n / 10)); // Caso Recursivo

}

// Casos de prueba para validación
console.assert(sumaDigitos(1243) === 10, "Error en sumaDigitos(1243)");
console.assert(sumaDigitos(0) === 0, "Error en sumaDigitos(0)");
console.assert(sumaDigitos(9) === 9, "Error en sumaDigitos(9)");
console.log("Ejercicio 1.1 superado.");
