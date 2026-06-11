import java.util.*;

public class QuickSort {
    static List<Integer> quickSort(List<Integer> lista) {

        if (lista.size() <= 1)
            return lista;
        int pivote = lista.get(0);

        List<Integer> menores = new ArrayList<>();
        List<Integer> mayores = new ArrayList<>();

        for (int i = 1; i < lista.size(); i++) {
            if (lista.get(i) <= pivote)
                menores.add(lista.get(i));
            else
                mayores.add(lista.get(i));
        }
        List<Integer> resultado = new ArrayList<>();
        resultado.addAll(quickSort(menores));
        resultado.add(pivote);
        resultado.addAll(quickSort(mayores));
        return resultado;
    }
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(8, 3, 1, 7, 4);
        System.out.println(quickSort(numeros));
    }
}