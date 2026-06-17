/*
== 
===
!=
!==
>
<
>=
<=

AND
&&

OR 
||

NOT
!

*/


// Comparan dos valores y devuelven true o false

// == (igualdad débil/no estricta)
// Compara solo el VALOR, convierte tipos si son diferentes
console.log(5 == "5")      // true   (convierte "5" a número)
console.log(0 == false)    // true   (convierte false a 0)

// === (igualdad estricta)
// Compara VALOR y TIPO, sin conversión
console.log(5 === "5")     // false  (number vs string)
console.log(5 === 5)       // true
console.log(0 === false)   // false  (number vs boolean)

// != (desigualdad débil)
console.log(5 != "5")      // false  (son iguales tras convertir)
console.log(5 != "6")      // true

// !== (desigualdad estricta)
console.log(5 !== "5")     // true   (tipos diferentes)
console.log(5 !== 5)       // false

// > (mayor que)
console.log(10 > 5)        // true

// < (menor que)
console.log(5 < 10)        // true

// >= (mayor o igual que)
console.log(10 >= 10)      // true

// <= (menor o igual que)
console.log(5 <= 5)        // true


// OPERADORES LÓGICOS
// Combinan o invierten condiciones (valores booleanos)

// AND (&&) → true solo si AMBAS condiciones son true
const edad = 20
const tieneCedula = true
console.log(edad >= 18 && tieneCedula)   // true

// OR (||) → true si AL MENOS UNA condición es true
const esFinDeSemana = false
const esFeriado = true
console.log(esFinDeSemana || esFeriado)  // true

// NOT (!) → invierte el valor booleano
const estaLloviendo = true
console.log(!estaLloviendo) // false

const a = 10
const b = 20
const c = "30"

const x = a == b
const x1 = a === b
const x2 = a === c
const x3 = a == c

console.log(x)
console.log(x1)
console.log(x2)
console.log(x3)
