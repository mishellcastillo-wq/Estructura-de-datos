package APE07;
import java.util.ArrayList;
import java.util.Random;

/**
 * CentroDistribucion
 * Volumen: 10.000 paquetes
 * Algoritmo de ordenamiento: QUICK SORT — O(n log n) promedio
 * Algoritmo de busqueda: BUSQUEDA BINARIA — O(log n), requiere datos ordenados
 * Estructura de despacho: COLA FIFO — despacha primero el paquete con menor CP.
 *
 * Tarea 3 (ABP): Simulacion de rendimiento con 10.000 IDs aleatorios,
 * comparando busqueda lineal vs busqueda binaria, midiendo tiempos con
 * System.nanoTime() e incluyendo el costo de ordenar antes de buscar.
 */
public class CentroDistribucion {

    private ArrayList<Paquete> inventario;
    private boolean ordenado; // bandera que indica si el inventario esta ordenado

    public CentroDistribucion() {
        this.inventario = new ArrayList<>();
        this.ordenado = false;
    }

    //   Recepcion de paquetes
    public void recibirPaquete(Paquete p) {
        this.inventario.add(p);
        this.ordenado = false; // cualquier paquete nuevo puede romper el orden
    }

    //   Despacho FIFO (inicio de la cola = menor CP)
    public Paquete despacharACliente() {
        if (!this.inventario.isEmpty()) {
            return this.inventario.remove(0); // FIFO: saca del inicio
        }
        return null;
    }

    public int totalInventario() {
        return this.inventario.size();
    }

    //   Quick Sort
    public void ordenarRutaQuickSort() {
        quickSort(this.inventario, 0, this.inventario.size() - 1);
        this.ordenado = true; // marca que ya quedo ordenado por CP
    }

    private void quickSort(ArrayList<Paquete> lista, int bajo, int alto) {
        if (bajo < alto) {
            int pivoteIdx = particion(lista, bajo, alto);
            quickSort(lista, bajo, pivoteIdx - 1);
            quickSort(lista, pivoteIdx + 1, alto);
        }
    }

    private int particion(ArrayList<Paquete> lista, int bajo, int alto) {
        int pivote = lista.get(alto).getCodigoPostal();
        int i = bajo - 1;

        for (int j = bajo; j < alto; j++) {
            if (lista.get(j).getCodigoPostal() <= pivote) {
                i++;
                Paquete temp = lista.get(i);
                lista.set(i, lista.get(j));
                lista.set(j, temp);
            }
        }
        Paquete temp = lista.get(i + 1);
        lista.set(i + 1, lista.get(alto));
        lista.set(alto, temp);

        return i + 1;
    }

    //   Verificacion de orden (uso interno y para pruebas)
    public boolean estaOrdenadoPorId() {
        for (int i = 0; i < inventario.size() - 1; i++) {
            if (inventario.get(i).getId() > inventario.get(i + 1).getId())
                return false;
        }
        return true;
    }

    // Ordena el inventario por ID (necesario antes de buscar por ID)
    public void ordenarPorId() {
        inventario.sort((p1, p2) -> Integer.compare(p1.getId(), p2.getId()));
        this.ordenado = true;
    }

    //   BUSQUEDA LINEAL
    // No requiere datos ordenados. Complejidad: O(n)
    public int busquedaLinealPorId(int idBuscado) {
        for (int i = 0; i < inventario.size(); i++) {
            if (inventario.get(i).getId() == idBuscado) {
                return i; // retorna el indice donde se encontro
            }
        }
        return -1; // no encontrado
    }

    //   BUSQUEDA BINARIA
    // PRE-CONDICION OBLIGATORIA: la lista debe estar ordenada por ID.
    // Si no lo esta, el resultado puede ser incorrecto o incompleto,
    // por eso se verifica antes de ejecutar el algoritmo.
    // Complejidad: O(log n)
    public int busquedaBinariaPorId(int idBuscado) {

        // Verificacion obligatoria: sin esto la busqueda binaria
        // puede fallar silenciosamente sobre datos desordenados.
        if (!estaOrdenadoPorId()) {
            throw new IllegalStateException(
                "El inventario debe estar ordenado por ID antes de "
              + "ejecutar busqueda binaria. Llama a ordenarPorId() primero."
            );
        }

        int bajo = 0;
        int alto = inventario.size() - 1;

        while (bajo <= alto) {
            int medio = bajo + (alto - bajo) / 2;
            int idMedio = inventario.get(medio).getId();

            if (idMedio == idBuscado) {
                return medio; // encontrado
            } else if (idMedio < idBuscado) {
                bajo = medio + 1;  // buscar en la mitad derecha
            } else {
                alto = medio - 1;  // buscar en la mitad izquierda
            }
        }
        return -1; // no encontrado
    }

    //   Main
    public static void main(String[] args) {
        System.out.println("=== CENTRO DE DISTRIBUCION — 10.000 PAQUETES ===");
        System.out.println("Quick Sort para rutas | Busqueda Lineal vs Binaria por ID");
        System.out.println("------------------------------------------------\n");

        //   Demostracion original: ordenar por CP y despachar FIFO ──
        CentroDistribucion centro = new CentroDistribucion();
        Random random = new Random(42);
        int VOLUMEN = 10_000;

        System.out.println("Generando " + VOLUMEN + " paquetes...");
        for (int i = 0; i < VOLUMEN; i++) {
            int cp = random.nextInt(10000) + 110000;
            centro.recibirPaquete(new Paquete(i, cp));
        }
        System.out.println("Paquetes en inventario: " + centro.totalInventario());

        System.out.println("Ordenando rutas por Codigo Postal (Quick Sort)...");
        long inicioCP = System.currentTimeMillis();
        centro.ordenarRutaQuickSort();
        long finCP = System.currentTimeMillis();
        System.out.println("Tiempo de ordenamiento por CP: " + (finCP - inicioCP) + " ms");

        System.out.println("\nPrimeros 5 paquetes a despachar (FIFO - menor CP primero):");
        for (int i = 0; i < 5; i++) {
            Paquete p = centro.despacharACliente();
            if (p != null) System.out.println("  -> " + p);
        }
        System.out.println("Paquetes restantes: " + centro.totalInventario());

        //   TAREA 3 (ABP): Simulacion de rendimiento
        ejecutarTarea3();
    }

    // TAREA 3 (ABP)
    // Genera 10.000 IDs aleatorios de paquetes, mide con System.nanoTime()
    // el tiempo de busqueda lineal vs busqueda binaria, incluyendo el
    // costo de ordenar previo a la busqueda binaria.
    public static void ejecutarTarea3() {
        System.out.println("\n\n=== TAREA 3 (ABP): SIMULACION DE RENDIMIENTO ===");
        System.out.println("Busqueda Lineal vs Busqueda Binaria | 10.000 IDs aleatorios\n");

        int N = 10_000;
        Random rng = new Random(123);

        // 1. Generar 10.000 paquetes con IDs aleatorios (no secuenciales)
        CentroDistribucion centro = new CentroDistribucion();
        ArrayList<Integer> idsGenerados = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            int idAleatorio = rng.nextInt(1_000_000); // ID aleatorio entre 0 y 999.999
            int cp = rng.nextInt(10000) + 110000;
            centro.recibirPaquete(new Paquete(idAleatorio, cp));
            idsGenerados.add(idAleatorio);
        }

        // 2. Elegir un ID de busqueda que SI existe (para que ambas
        //    busquedas tengan que recorrer/comparar de verdad)
        int idBuscado = idsGenerados.get(N - 1); // el ultimo insertado (peor caso lineal)

        // 3. BUSQUEDA LINEAL — no requiere orden previo
        long inicioLineal = System.nanoTime();
        int resultadoLineal = centro.busquedaLinealPorId(idBuscado);
        long finLineal = System.nanoTime();
        long tiempoLineal = finLineal - inicioLineal;

        // 4. ORDENAMIENTO previo, requerido para busqueda binaria
        long inicioOrden = System.nanoTime();
        centro.ordenarPorId();
        long finOrden = System.nanoTime();
        long tiempoOrden = finOrden - inicioOrden;

        // 5. BUSQUEDA BINARIA — ya con datos verificados como ordenados
        long inicioBinaria = System.nanoTime();
        int resultadoBinaria = centro.busquedaBinariaPorId(idBuscado);
        long finBinaria = System.nanoTime();
        long tiempoBinaria = finBinaria - inicioBinaria;

        // 6. Tiempo total de la estrategia binaria (orden + busqueda)
        long tiempoBinariaTotal = tiempoOrden + tiempoBinaria;

        // ── Mostrar resultados ──
        System.out.println("ID buscado: " + idBuscado);
        System.out.println("Indice encontrado (lineal) : " + resultadoLineal);
        System.out.println("Indice encontrado (binaria): " + resultadoBinaria);
        System.out.println("¿Inventario ordenado antes de la busqueda binaria? "
            + centro.estaOrdenadoPorId());

        //   Tabla comparativa
        System.out.println("\n┌─────────────────────────────┬──────────────────┐");
        System.out.println("│ Metodo                      │ Tiempo (ns)       │");
        System.out.println("├─────────────────────────────┼──────────────────┤");
        System.out.printf ("│ %-28s │ %16d │%n", "Busqueda Lineal", tiempoLineal);
        System.out.printf ("│ %-28s │ %16d │%n", "Ordenar por ID (previo)", tiempoOrden);
        System.out.printf ("│ %-28s │ %16d │%n", "Busqueda Binaria (sola)", tiempoBinaria);
        System.out.printf ("│ %-28s │ %16d │%n", "Binaria TOTAL (orden+buscar)", tiempoBinariaTotal);
        System.out.println("└─────────────────────────────┴──────────────────┘");
    }
}
