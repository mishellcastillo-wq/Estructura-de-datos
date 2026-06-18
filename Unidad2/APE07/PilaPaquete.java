package APE07;

public class PilaPaquete {
    private Paquete[] stack;
    private int top;

    public PilaPaquete(int capacidad) {
        this.stack = new Paquete[capacidad];
        this.top = -1; // -1 significa pila vacía
    }

    // PUSH: agrega un paquete al tope de la pila
    // LIFO: el último en entrar será el primero en salir
    public void push(Paquete p) {
        if (estaLlena()) {
            System.out.println("Pila llena. No se puede agregar el paquete ID: " + p.getId());
            return;
        }
        top++;           // sube el tope
        stack[top] = p;  // coloca el paquete en el tope
    }

    // POP: saca el paquete del tope de la pila
    // LIFO: siempre sale el último que entró
    public Paquete pop() {
        if (estaVacia()) {
            System.out.println("Pila vacía. No hay paquetes que sacar.");
            return null;
        }
        Paquete paqueteAlTope = stack[top]; // guarda el paquete del tope
        stack[top] = null;                  // libera la referencia (buena práctica)
        top--;                              // baja el tope
        return paqueteAlTope;
    }

    // PEEK: mira el tope sin sacar el paquete
    public Paquete peek() {
        if (estaVacia()) {
            System.out.println("Pila vacía. No hay paquetes para ver.");
            return null;
        }
        return stack[top]; // solo muestra, no elimina
    }

    // ESTÁ VACÍA
    public boolean estaVacia() {
        return top == -1; // si top es -1, no hay ningún elemento
    }

    // ESTÁ LLENA
    public boolean estaLlena() {
        return top == stack.length - 1; // top llegó al último índice del arreglo
    }

    // TAMAÑO ACTUAL
    public int tamanio() {
        return top + 1; // top empieza en -1, entonces el tamaño es top+1
    }

    // MOSTRAR PILA
    // Muestra desde el tope hacia abajo (orden LIFO visual)
    public void mostrarPila() {
        if (estaVacia()) {
            System.out.println("Pila vacía.");
            return;
        }
        System.out.println("--- TOPE ---");
        for (int i = top; i >= 0; i--) {
            System.out.println("  [" + i + "] ID=" + stack[i].getId()
                    + " | CP=" + stack[i].getCodigoPostal());
        }
        System.out.println("--- FONDO ---");
    }

    // MAIN: demostración LIFO
    public static void main(String[] args) {
        System.out.println("=== PILA DE PAQUETES (LIFO) ===\n");

        PilaPaquete pila = new PilaPaquete(5);

        // Agregar paquetes
        System.out.println("-- Agregando 5 paquetes --");
        pila.push(new Paquete(1, 110101));
        pila.push(new Paquete(2, 110205));
        pila.push(new Paquete(3, 110312));
        pila.push(new Paquete(4, 110408));
        pila.push(new Paquete(5, 110550));

        // Intentar agregar uno más (pila llena)
        pila.push(new Paquete(6, 110600));

        // Mostrar estado
        System.out.println();
        pila.mostrarPila();

        // Ver el tope sin sacar
        System.out.println("\nTope actual (peek): ID=" + pila.peek().getId());

        // Sacar paquetes (LIFO: sale el 5, luego 4, luego 3...)
        System.out.println("\n-- Sacando paquetes (LIFO) --");
        while (!pila.estaVacia()) {
            Paquete p = pila.pop();
            System.out.println("Salió -> ID=" + p.getId() + " | CP=" + p.getCodigoPostal());
        }

        // Intentar sacar de pila vacía
        pila.pop();
    }
}

