let edadesEstudiantes = [20, 18, 22, 19, 21];

for (let i = 1; i < edadesEstudiantes.length; i++) {

    let actual = edadesEstudiantes[i];
    let j = i - 1;

    while (j >= 0 && edadesEstudiantes[j] > actual) {

        edadesEstudiantes[j + 1] = edadesEstudiantes[j];
        j--;
    }

    edadesEstudiantes[j + 1] = actual;
}

console.log("Edades ordenadas:");
console.log(edadesEstudiantes);