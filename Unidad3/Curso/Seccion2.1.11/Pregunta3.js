/* Pregunta 3: Realizar una cadena de conversiones: crear un Boolean a partir de 
un BigInt creado a partir de un Number que fue creado a partir de un String. 
Empezar con el valor "1234". ¿Es posible? */

let s = "1234";
let n = Number(s);
let bi = BigInt(n);
let b = Boolean(bi);

console.log(`${b} [${typeof b}]`); // true [boolean]

// Sí, es posible. La cadena de conversión es:
// "1234" (string) -> 1234 (number) -> 1234n (bigint) -> true (boolean)