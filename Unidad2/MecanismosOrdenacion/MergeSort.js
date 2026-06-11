function mergeSort(lista) {
    if (lista.length <= 1) {
        return lista;
    }
    let medio = Math.floor(lista.length / 2);

    let izquierda = mergeSort(lista.slice(0, medio));
    let derecha = mergeSort(lista.slice(medio));

    let resultado = [];
    while (izquierda.length && derecha.length) {

        resultado.push(
            izquierda[0] < derecha[0]
            ? izquierda.shift()
            : derecha.shift()
        );
    }
    return [...resultado, ...izquierda, ...derecha];
}
console.log(mergeSort([8, 3, 1, 7, 4]));