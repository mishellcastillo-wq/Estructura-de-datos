class NodoTrie {
    constructor() {
        // Map optimiza memoria: solo reserva espacio para caracteres existentes
        this.hijos = new Map();
        this.esFinDePalabra = false;
    }
}

class MotorAutocompletado {
    constructor() {
        this.raiz = new NodoTrie(); // Punto de entrada vacío
    }

    // Inserta una palabra. Complejidad: O(L) donde L = longitud del término
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

// INICIALIZACIÓN Y CARGA DE DICCIONARIO

const motor = new MotorAutocompletado();

// Diccionario de términos logísticos para simulación
const diccionario = [
    "paquete_express", 
    "postal_nacional", 
    "prioritario", 
    "estandar", 
    "perecedero"
];

// Carga de términos al Trie (Uso eficiente de la memoria Heap)
diccionario.forEach(termino => motor.insertarTermino(termino));

console.log("Diccionario de paquetería cargado exitosamente en el Trie.\n");

// GUÍA PARA LA SIMULACIÓN DE BÚSQUEDA
// --- Prueba de Llamadas Individuales (Análisis de Precisión) ---
console.log("--- Búsqueda Manual ---");
console.log("Sugerencias para 'p':", motor.obtenerSugerencias("p"));
console.log("Sugerencias para 'pa':", motor.obtenerSugerencias("pa"));
console.log("Sugerencias para 'pos':", motor.obtenerSugerencias("pos"));

// --- Prueba de Bucle Iterativo (Análisis de Escalabilidad) ---
const prefijosPrueba = ["p", "pa", "pos", "e", "pe"];

console.log("\n--- Simulación de Bucle de Búsqueda (Carga de Trabajo) ---");
prefijosPrueba.forEach(prefijo => {
    console.time(`Tiempo_Busqueda_${prefijo}`); // Medición de latencia en ms
    const resultados = motor.obtenerSugerencias(prefijo);
    console.timeEnd(`Tiempo_Busqueda_${prefijo}`); // Cierra el temporizador de V8
    console.log(` -> Sugerencias para '${prefijo}':`, resultados);
});