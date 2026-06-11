def quick_sort(lista):

    if len(lista) <= 1:
        return lista

    pivote = lista[0]

    menores = [x for x in lista[1:] if x <= pivote]
    mayores = [x for x in lista[1:] if x > pivote]

    return quick_sort(menores) + [pivote] + quick_sort(mayores)


numeros = [8, 3, 1, 7, 4]

print(quick_sort(numeros))