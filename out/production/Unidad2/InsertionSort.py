edades_estudiantes = [20, 18, 22, 19, 21]

for i in range(1, len(edades_estudiantes)):

    actual = edades_estudiantes[i]
    j = i - 1

    while j >= 0 and edades_estudiantes[j] > actual:

        edades_estudiantes[j + 1] = edades_estudiantes[j]
        j -= 1

    edades_estudiantes[j + 1] = actual

print("Edades ordenadas:")
print(edades_estudiantes)