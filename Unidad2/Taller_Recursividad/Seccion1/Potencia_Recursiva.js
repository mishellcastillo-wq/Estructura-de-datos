function potencia(base, exponente) {
    // CASO BASE:
    // Cualquier número elevado a 0 es 1.
    if (exponente === 0) {
        return 1;
    }

    // CASO RECURSIVO (Exponenciación Binaria):
    if (exponente % 2 === 0) {
        // CASO PAR: base^n = (base^(n/2))^2
        const mitad = potencia(base, exponente / 2);
        return mitad * mitad;
    } else {
        // CASO IMPAR: base^n = base * (base^((n-1)/2))^2
        const mitad = potencia(base, (exponente - 1) / 2);
        return base * mitad * mitad;
    }
}


// Casos de prueba para validación
console.assert(potencia(2, 10) === 1024, "Error en potencia(2, 10)");
console.assert(potencia(5, 3) === 125, "Error en potencia(5, 3)");
console.assert(potencia(7, 0) === 1, "Error en potencia(7, 0)");
console.log("Ejercicio 1.2 superado.");

