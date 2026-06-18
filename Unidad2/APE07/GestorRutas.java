package APE07;
public class GestorRutas {

    // BURBUJA
    // Compara pares adyacentes y los intercambia si están desordenados.
    // El mayor "burbujea" hacia el final en cada pasada.
    // Complejidad: O(n²) — solo recomendado para pocos paquetes.
    public static void ordenarBurbuja(Paquete[] datos) {
        int n = datos.length;
        for (int i = 0; i < n - 1; i++) {               // pasadas
            for (int j = 0; j < n - i - 1; j++) {       // comparaciones por pasada
                if (datos[j].getCodigoPostal() > datos[j + 1].getCodigoPostal()) {
                    Paquete temp = datos[j];              // swap
                    datos[j]     = datos[j + 1];
                    datos[j + 1] = temp;
                }
            }
        }
    }

    // INSERCIÓN
    // Toma cada paquete y lo inserta en su posición correcta
    // dentro de la parte ya ordenada (como ordenar cartas en la mano).
    // Complejidad: O(n²) peor caso, O(n) si ya está casi ordenado.
    public static void ordenarInsercion(Paquete[] datos) {
        int n = datos.length;
        for (int i = 1; i < n; i++) {
            Paquete actual = datos[i];                   // paquete a insertar
            int j = i - 1;
            // desplaza hacia la derecha los mayores que 'actual'
            while (j >= 0 && datos[j].getCodigoPostal() > actual.getCodigoPostal()) {
                datos[j + 1] = datos[j];
                j--;
            }
            datos[j + 1] = actual;                      // inserta en su lugar
        }
    }

    // QUICK SORT
    // Elige un pivote, coloca los menores a su izquierda y los
    // mayores a su derecha, luego repite en cada mitad.
    // Complejidad: O(n log n) promedio — óptimo para ~50.000 paquetes.
    public static void ordenarQuickSort(Paquete[] datos) {
        quickSort(datos, 0, datos.length - 1);
    }

    private static void quickSort(Paquete[] datos, int bajo, int alto) {
        if (bajo < alto) {
            int pivoteIdx = particion(datos, bajo, alto);
            quickSort(datos, bajo, pivoteIdx - 1);       // mitad izquierda
            quickSort(datos, pivoteIdx + 1, alto);       // mitad derecha
        }
    }

    private static int particion(Paquete[] datos, int bajo, int alto) {
        int pivote = datos[alto].getCodigoPostal();      // pivote = último elemento
        int i = bajo - 1;
        for (int j = bajo; j < alto; j++) {
            if (datos[j].getCodigoPostal() <= pivote) {
                i++;
                Paquete temp = datos[i];                 // swap
                datos[i]     = datos[j];
                datos[j]     = temp;
            }
        }
        Paquete temp  = datos[i + 1];                    // coloca pivote en su lugar
        datos[i + 1]  = datos[alto];
        datos[alto]   = temp;
        return i + 1;
    }

    // MERGE SORT
    // Divide el arreglo a la mitad recursivamente hasta tener
    // subarreglos de 1 elemento, luego los fusiona ordenados.
    // Complejidad: O(n log n) garantizado — óptimo para ~75.000+.
    public static void ordenarMergeSort(Paquete[] datos) {
        mergeSort(datos, 0, datos.length - 1);
    }

    private static void mergeSort(Paquete[] datos, int izq, int der) {
        if (izq < der) {
            int medio = (izq + der) / 2;
            mergeSort(datos, izq, medio);                // ordena mitad izquierda
            mergeSort(datos, medio + 1, der);            // ordena mitad derecha
            merge(datos, izq, medio, der);               // fusiona ambas mitades
        }
    }

    private static void merge(Paquete[] datos, int izq, int medio, int der) {
        int n1 = medio - izq + 1;
        int n2 = der - medio;

        Paquete[] listaIzq = new Paquete[n1];
        Paquete[] listaDer = new Paquete[n2];

        for (int i = 0; i < n1; i++) listaIzq[i] = datos[izq + i];
        for (int j = 0; j < n2; j++) listaDer[j] = datos[medio + 1 + j];

        int i = 0, j = 0, k = izq;
        while (i < n1 && j < n2) {
            if (listaIzq[i].getCodigoPostal() <= listaDer[j].getCodigoPostal()) {
                datos[k++] = listaIzq[i++];
            } else {
                datos[k++] = listaDer[j++];
            }
        }
        while (i < n1) datos[k++] = listaIzq[i++];
        while (j < n2) datos[k++] = listaDer[j++];
    }

    // UTILIDADES

    // Muestra los primeros N paquetes del arreglo
    public static void mostrar(Paquete[] datos, int cantidad) {
        int limite = Math.min(cantidad, datos.length);
        for (int i = 0; i < limite; i++) {
            System.out.println("  [" + i + "] ID=" + datos[i].getId()
                    + " | CP=" + datos[i].getCodigoPostal());
        }
    }

    // Verifica si el arreglo está ordenado de menor a mayor CP
    public static boolean estaOrdenado(Paquete[] datos) {
        for (int i = 0; i < datos.length - 1; i++) {
            if (datos[i].getCodigoPostal() > datos[i + 1].getCodigoPostal())
                return false;
        }
        return true;
    }

    // Copia un arreglo (para probar el mismo set con distintos algoritmos)
    private static Paquete[] copiar(Paquete[] original) {
        Paquete[] copia = new Paquete[original.length];
        System.arraycopy(original, 0, copia, 0, original.length);
        return copia;
    }

    // MAIN: comparación de los 4 algoritmos
    public static void main(String[] args) {
        System.out.println("=== GESTOR DE RUTAS — COMPARACIÓN DE ALGORITMOS ===\n");

        // Generar datos de prueba
        int N = 10_000;
        java.util.Random rng = new java.util.Random(42);
        Paquete[] original = new Paquete[N];
        for (int i = 0; i < N; i++) {
            original[i] = new Paquete(i, rng.nextInt(90000) + 110000);
        }

        Paquete[] datos;
        long inicio, fin;

        // Burbuja
        datos = copiar(original);
        inicio = System.currentTimeMillis();
        ordenarBurbuja(datos);
        fin = System.currentTimeMillis();
        System.out.println("Burbuja    | " + N + " paquetes | " + (fin - inicio) + " ms | Ordenado: " + estaOrdenado(datos));

        // Inserción
        datos = copiar(original);
        inicio = System.currentTimeMillis();
        ordenarInsercion(datos);
        fin = System.currentTimeMillis();
        System.out.println("Inserción  | " + N + " paquetes | " + (fin - inicio) + " ms | Ordenado: " + estaOrdenado(datos));

        // Quick Sort
        datos = copiar(original);
        inicio = System.currentTimeMillis();
        ordenarQuickSort(datos);
        fin = System.currentTimeMillis();
        System.out.println("Quick Sort | " + N + " paquetes | " + (fin - inicio) + " ms | Ordenado: " + estaOrdenado(datos));

        // Merge Sort
        datos = copiar(original);
        inicio = System.currentTimeMillis();
        ordenarMergeSort(datos);
        fin = System.currentTimeMillis();
        System.out.println("Merge Sort | " + N + " paquetes | " + (fin - inicio) + " ms | Ordenado: " + estaOrdenado(datos));

        // Mostrar primeros 5 resultados del último sort
        System.out.println("\nPrimeros 5 paquetes ordenados (Merge Sort):");
        mostrar(datos, 5);
    }
}