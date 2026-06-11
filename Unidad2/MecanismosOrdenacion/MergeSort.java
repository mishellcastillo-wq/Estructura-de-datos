import java.util.Arrays;
public class MergeSort {

    static int[] mergeSort(int[] lista) {

        if (lista.length <= 1)
            return lista;
        int medio = lista.length / 2;

        int[] izquierda = mergeSort(Arrays.copyOfRange(lista, 0, medio));
        int[] derecha = mergeSort(Arrays.copyOfRange(lista, medio, lista.length));

        int[] resultado = new int[lista.length];
        int i = 0, j = 0, k = 0;

        while (i < izquierda.length && j < derecha.length) {
            if (izquierda[i] < derecha[j])
                resultado[k++] = izquierda[i++];
            else
                resultado[k++] = derecha[j++];
        }

        while (i < izquierda.length)
            resultado[k++] = izquierda[i++];

        while (j < derecha.length)
            resultado[k++] = derecha[j++];

        return resultado;
    }
    public static void main(String[] args) {
        int[] numeros = {8, 3, 1, 7, 4};
        numeros = mergeSort(numeros);

        System.out.println(Arrays.toString(numeros));
    }
}