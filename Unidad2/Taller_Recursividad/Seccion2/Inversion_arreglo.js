function invertirArreglo(arr, inicio, fin) {
    // Caso Base: Si inicio es mayor o igual a fin, no hay más elementos para intercambiar
    if (inicio >= fin) {
        return;
    }

    // Caso Recursivo: Intercambiar los elementos en las posiciones inicio y fin
    [arr[inicio], arr[fin]] = [arr[fin], arr[inicio]];

    // Llamada recursiva con los índices ajustados
    invertirArreglo(arr, inicio + 1, fin - 1);
}

// Casos de prueba para validación
let miLista = [10, 20, 30, 40, 50];
invertirArreglo(miLista, 0, miLista.length - 1);
console.assert(JSON.stringify(miLista) === JSON.stringify([50, 40, 30, 20, 10]));
console.log("Ejercicio 2.1 superado.");
