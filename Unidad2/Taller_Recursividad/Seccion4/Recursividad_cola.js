function factorialCola(n, acumulador = 1) {
    if (n === 0) {
        return acumulador;
    }
    return factorialCola(n - 1, acumulador * n);
}

console.log("El factorial de 5 es:", factorialCola(5));