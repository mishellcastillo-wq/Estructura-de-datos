
public class BubbleSort {
    public static void main(String[] args) {

        int[] calificaciones = {75, 90, 60, 85, 70};
        System.out.println("Calificaciones antes de ordenar:");

        for (int nota : calificaciones) {
            System.out.print(nota + " ");
        }
        // Bubble Sort
        for (int i = 0; i < calificaciones.length - 1; i++) {
            for (int j = 0; j < calificaciones.length - 1 - i; j++) {
                if (calificaciones[j] > calificaciones[j + 1]) {
                    int auxiliar = calificaciones[j];
                    calificaciones[j] = calificaciones[j + 1];
                    calificaciones[j + 1] = auxiliar;
                }
            }
        }
        System.out.println("\nCalificaciones ordenadas:");
        for (int nota : calificaciones) {
            System.out.print(nota + " ");
        }
    }
}
