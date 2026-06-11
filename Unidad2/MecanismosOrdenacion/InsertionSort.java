public class InsertionSort {
    public static void main(String[] args) {

        int[] edadesEstudiantes = {20, 18, 22, 19, 21};

        for (int i = 1; i < edadesEstudiantes.length; i++) {
            int actual = edadesEstudiantes[i];
            int j = i - 1;
            while (j >= 0 && edadesEstudiantes[j] > actual) {
                edadesEstudiantes[j + 1] = edadesEstudiantes[j];
                j--;
            }
            edadesEstudiantes[j + 1] = actual;
        }
        System.out.println("Edades ordenadas:");

        for (int edad : edadesEstudiantes) {
            System.out.print(edad + " ");
        }
    }
}
