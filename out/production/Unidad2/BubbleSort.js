let calificaciones = [75, 90, 60, 85, 70];

console.log("Antes de ordenar:");
console.log(calificaciones);

// Bubble Sort
for (let i = 0; i < calificaciones.length - 1; i++) {

    for (let j = 0; j < calificaciones.length - 1 - i; j++) {

        if (calificaciones[j] > calificaciones[j + 1]) {

            let auxiliar = calificaciones[j];
            calificaciones[j] = calificaciones[j + 1];
            calificaciones[j + 1] = auxiliar;
        }
    }
}

console.log("Después de ordenar:");
console.log(calificaciones);