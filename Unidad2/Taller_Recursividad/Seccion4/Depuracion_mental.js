// Función original
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  // Función sencilla para mostrar el árbol
  function fibonacciArbol(n, nivel = 0) {
    const espacios = "│  ".repeat(nivel); // Sangría para ver los niveles
    console.log(`${espacios}→ fibonacci(${n})`);
  
    if (n <= 1) {
      console.log(`${espacios}← retorna ${n}`);
      return n;
    }
  
    const a = fibonacciArbol(n - 1, nivel + 1);
    const b = fibonacciArbol(n - 2, nivel + 1);
    const res = a + b;
  
    console.log(`${espacios}← retorna ${res}`);
    return res;
  }
  
  // Prueba
  console.log("Resultado final:", fibonacci(4));
  console.log("\nÁrbol de llamadas:");
  fibonacciArbol(4);