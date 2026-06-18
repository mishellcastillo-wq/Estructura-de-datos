package APE07;
public class ColaPaquetes {
    private Paquete[] queue;
    private int frente, fin, total;

    public ColaPaquetes(int capacidad) {
        this.queue = new Paquete[capacidad];
        this.frente = 0;
        this.fin = 0;
        this.total = 0;
    }

    // ENQUEUE: agrega un paquete al final de la cola
    // El operador % hace que la cola sea CIRCULAR:
    // cuando fin llega al último índice, vuelve al índice 0
    // así reutiliza los espacios liberados por dequeue()
    public void enqueue(Paquete p) {
        if (estaLlena()) {
            System.out.println("Cola llena. No se puede agregar el paquete ID: " + p.getId());
            return;
        }
        queue[fin] = p;                    // coloca el paquete en la posición fin
        fin = (fin + 1) % queue.length;    // avanza fin, si llega al límite vuelve a 0
        total++;                           // incrementa el contador de elementos
    }

    // DEQUEUE: saca el paquete del frente de la cola
    // FIFO: siempre sale el primero que entró
    public Paquete dequeue() {
        if (estaVacia()) {
            System.out.println("Cola vacía. No hay paquetes que sacar.");
            return null;
        }
        Paquete paqueteAlFrente = queue[frente]; // guarda el paquete del frente
        queue[frente] = null;                    // libera la referencia
        frente = (frente + 1) % queue.length;    // avanza frente circularmente
        total--;                                 // decrementa el contador
        return paqueteAlFrente;
    }

    // PEEK: mira el frente sin sacar el paquete
    public Paquete peek() {
        if (estaVacia()) {
            System.out.println("Cola vacía. No hay paquetes para ver.");
            return null;
        }
        return queue[frente]; // solo muestra, no elimina
    }

    // ESTÁ VACÍA
    public boolean estaVacia() {
        return total == 0;
    }

    // ESTÁ LLENA
    public boolean estaLlena() {
        return total == queue.length;
    }

    // TAMAÑO ACTUAL
    public int tamanio() {
        return total;
    }

    // MOSTRAR COLA
    // Muestra desde el frente hacia el fin (orden FIFO visual)
    public void mostrarCola() {
        if (estaVacia()) {
            System.out.println("Cola vacía.");
            return;
        }
        System.out.println("--- FRENTE (sale primero) ---");
        for (int i = 0; i < total; i++) {
            int idx = (frente + i) % queue.length; // índice circular
            System.out.println("  [" + i + "] ID=" + queue[idx].getId()
                    + " | CP=" + queue[idx].getCodigoPostal());
        }
        System.out.println("--- FIN (entra aquí) ---");
    }

    // MAIN: demostración FIFO con cola circular
    public static void main(String[] args) {
        System.out.println("=== COLA DE PAQUETES (FIFO - Circular) ===\n");

        ColaPaquetes cola = new ColaPaquetes(5);

        // Agregar paquetes
        System.out.println("-- Encolando 5 paquetes --");
        cola.enqueue(new Paquete(1, 110101));
        cola.enqueue(new Paquete(2, 110205));
        cola.enqueue(new Paquete(3, 110312));
        cola.enqueue(new Paquete(4, 110408));
        cola.enqueue(new Paquete(5, 110550));

        // Intentar agregar uno más (cola llena)
        cola.enqueue(new Paquete(6, 110600));

        // Mostrar estado
        System.out.println();
        cola.mostrarCola();

        // Ver el frente sin sacar
        System.out.println("\nFrente actual (peek): ID=" + cola.peek().getId());

        // Sacar 2 paquetes (FIFO: sale el 1, luego el 2)
        System.out.println("\n-- Sacando 2 paquetes (FIFO) --");
        Paquete p1 = cola.dequeue();
        System.out.println("Salió -> ID=" + p1.getId() + " | CP=" + p1.getCodigoPostal());
        Paquete p2 = cola.dequeue();
        System.out.println("Salió -> ID=" + p2.getId() + " | CP=" + p2.getCodigoPostal());

        // Demostración circular: ahora hay espacio, entra el 6 y el 7
        System.out.println("\n-- Encolando 2 más (demuestra circularidad) --");
        cola.enqueue(new Paquete(6, 110600));
        cola.enqueue(new Paquete(7, 110710));

        System.out.println();
        cola.mostrarCola();

        // Vaciar toda la cola
        System.out.println("\n-- Vaciando la cola (FIFO) --");
        while (!cola.estaVacia()) {
            Paquete p = cola.dequeue();
            System.out.println("Salió -> ID=" + p.getId() + " | CP=" + p.getCodigoPostal());
        }

        // Intentar sacar de cola vacía
        cola.dequeue();
    }
}

