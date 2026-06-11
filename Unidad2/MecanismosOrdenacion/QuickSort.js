function quickSort(lista) {

    if (lista.length <= 1) {
        return lista;
    }

    let pivote = lista[0];

    let menores = lista.slice(1).filter(x => x <= pivote);
    let mayores = lista.slice(1).filter(x => x > pivote);

    return [
        ...quickSort(menores),
        pivote,
        ...quickSort(mayores)
    ];
}

console.log(quickSort([8, 3, 1, 7, 4]));