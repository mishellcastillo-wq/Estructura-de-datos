calificaciones = [75, 90, 60, 85, 70]

print("Antes de ordenar:")
print(calificaciones)

# Bubble Sort
for i in range(len(calificaciones) - 1):

    for j in range(len(calificaciones) - 1 - i):

        if calificaciones[j] > calificaciones[j + 1]:

            auxiliar = calificaciones[j]
            calificaciones[j] = calificaciones[j + 1]
            calificaciones[j + 1] = auxiliar

print("Después de ordenar:")
print(calificaciones)