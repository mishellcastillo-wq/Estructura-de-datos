// Nodo básico del árbol de prefijos (Trie)
class NodoTrie {
    constructor() {
        // Map optimiza memoria: solo reserva espacio para caracteres existentes
        this.hijos = new Map();
        this.esFinDePalabra = false;
    }
}

// Gestiona las operaciones del Trie para autocompletado
class MotorAutocompletado {
    constructor() {
        this.raiz = new NodoTrie(); // Punto de entrada vacío
    }

    // Inserta una palabra en el Trie. Complejidad: O(L) donde L = longitud del término
    insertarTermino(termino) {
        let actual = this.raiz;
        const palabra = termino.toLowerCase();

        for (const char of palabra) {
            if (!actual.hijos.has(char)) {
                actual.hijos.set(char, new NodoTrie());
            }
            actual = actual.hijos.get(char);
        }
        actual.esFinDePalabra = true;
    }

    // Busca el nodo final de un prefijo. Complejidad: O(L) o null si no existe
    buscarNodoPrefijo(prefijo) {
        let actual = this.raiz;
        const p = prefijo.toLowerCase();

        for (const char of p) {
            if (!actual.hijos.has(char)) return null;
            actual = actual.hijos.get(char);
        }
        return actual;
    }

    // Retorna un array con todas las palabras que coinciden con el prefijo
    obtenerSugerencias(prefijo) {
        const resultados = [];
        const nodoInicial = this.buscarNodoPrefijo(prefijo);

        if (nodoInicial) {
            this.dfsExtraerPalabras(nodoInicial, prefijo.toLowerCase(), resultados);
        }
        return resultados;
    }

    // Recorrido DFS recursivo para reconstruir las palabras desde un nodo
    dfsExtraerPalabras(nodo, palabraActual, resultados) {
        if (nodo.esFinDePalabra) {
            resultados.push(palabraActual);
        }

        // El Map evita iteraciones vacías, recorriendo solo los hijos que existen
        for (const [char, hijo] of nodo.hijos) {
            this.dfsExtraerPalabras(hijo, palabraActual + char, resultados);
        }
    }
}

module.exports = { NodoTrie, MotorAutocompletado };