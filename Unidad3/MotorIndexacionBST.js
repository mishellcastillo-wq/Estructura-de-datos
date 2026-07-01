class NodoBusqueda {
    constructor(keyword, urlCache) {
        this.keyword = keyword;
        this.urlCache = urlCache;
        this.visitas = 1;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class MotorIndexacionBST {
    constructor() {
        this.raiz = null;
    }

    indexar(keyword, urlCache) {
        const nuevoNodo = new NodoBusqueda(keyword, urlCache);
        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        } else {
            this._insertarNodo(this.raiz, nuevoNodo);
        }
    }

    _insertarNodo(nodoActual, nuevoNodo) {
        const comparacion = nuevoNodo.keyword.localeCompare(nodoActual.keyword);

        if (comparacion === 0) {
            // keyword ya existe, solo incrementa visitas
            nodoActual.visitas++;

        } else if (comparacion < 0) {
            // va a la izquierda (alfabéticamente menor)
            if (nodoActual.izquierdo === null) {
                nodoActual.izquierdo = nuevoNodo;
            } else {
                this._insertarNodo(nodoActual.izquierdo, nuevoNodo);
            }

        } else {
            // va a la derecha (alfabéticamente mayor)
            if (nodoActual.derecho === null) {
                nodoActual.derecho = nuevoNodo;
            } else {
                this._insertarNodo(nodoActual.derecho, nuevoNodo);
            }
        }
    }

    buscar(keyword) {
        let actual = this.raiz;

        while (actual !== null) {
            const comparacion = keyword.localeCompare(actual.keyword);

            if (comparacion === 0) {
                return actual;             // encontrado
            } else if (comparacion < 0) {
                actual = actual.izquierdo; // buscar a la izquierda
            } else {
                actual = actual.derecho;   // buscar a la derecha
            }
        }

        return null; // no existe
    }

    exportarHistorial(nodo = this.raiz) {
        if (nodo === null) return;

        this.exportarHistorial(nodo.izquierdo);           // izquierda primero
        console.log(`[${nodo.visitas} visita(s)] ${nodo.keyword} → ${nodo.urlCache}`);
        this.exportarHistorial(nodo.derecho);             // luego derecha
    }
}

module.exports = MotorIndexacionBST;