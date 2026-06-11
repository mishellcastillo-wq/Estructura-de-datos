def merge_sort(lista):

    if len(lista) <= 1:
        return lista
    medio = len(lista) // 2

    izquierda = merge_sort(lista[:medio])
    derecha = merge_sort(lista[medio:])

    resultado = []
    i = j = 0

    while i < len(izquierda) and j < len(derecha):
        if izquierda[i] < derecha[j]:
            resultado.append(izquierda[i])
            i += 1
        else:
            resultado.append(derecha[j])
            j += 1

    resultado.extend(izquierda[i:])
    resultado.extend(derecha[j:])

    return resultado
numeros = [8, 3, 1, 7, 4]
print(merge_sort(numeros))