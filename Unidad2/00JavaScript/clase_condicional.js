/*
Condicionales: permiten ejecutar bloques de código
// según si una condición es verdadera (true) o falsa (false).
*/

// IF / ELSE IF / ELSE
const edad = 18
if (edad >= 18) {
    console.log("Es mayor de edad")
} else {
    console.log("Es menor de edad")
}


// Con else if para múltiples condiciones
const nota = 75
if (nota >= 90) {
    console.log("Excelente")
} else if (nota >= 70) {
    console.log("Aprobado")
} else if (nota >= 50) {
    console.log("Regular")
} else {
    console.log("Reprobado")
}


// SWITCH
const dia = "lunes"
switch (dia) {
    case "lunes":
    case "martes":
    case "miércoles":
    case "jueves":
    case "viernes":
        console.log("Día de semana")
        break
    case "sábado":
    case "domingo":
        console.log("Fin de semana")
        break
    default:
        console.log("Día no reconocido")
}


// 2. OPERADOR TERNARIO ( ? : )
// Forma corta de un if/else en una sola línea
// condicion ? valor_si_true : valor_si_false

const esMayorDeEdad = edad >= 18 ? "Puede votar" : "No puede votar"
console.log(esMayorDeEdad)

// Anidado
const temperatura = 25
const clima = temperatura > 30 ? "Calor" : temperatura > 15 ? "Templado" : "Frío"
console.log(clima)


// Funciones para el HTML
function evalEdad() {
    const edad = parseInt(document.getElementById('edad').value)
    const msg = edad >= 18 ? "Es mayor de edad" : "Es menor de edad"
    document.getElementById('out-edad').textContent = '> ' + msg
}

function evalNota() {
    const nota = parseInt(document.getElementById('nota').value)
    let msg
    if (nota >= 90)      msg = "Excelente"
    else if (nota >= 70) msg = "Aprobado"
    else if (nota >= 50) msg = "Regular"
    else                 msg = "Reprobado"
    document.getElementById('out-nota').textContent = '> ' + msg
}

function evalSwitch() {
    const dia = document.getElementById('dia').value
    let msg
    switch (dia) {
        case "lunes": case "martes": case "miércoles":
        case "jueves": case "viernes":
            msg = "Día de semana"; break
        case "sábado": case "domingo":
            msg = "Fin de semana"; break
        default:
            msg = "Día no reconocido"
    }
    document.getElementById('out-switch').textContent = '> ' + msg
}

function evalTernario() {
    const edad = parseInt(document.getElementById('edad2').value)
    const temp = parseInt(document.getElementById('temp').value)
    document.getElementById('out-t1').textContent = '> ' + (edad >= 18 ? "Puede votar" : "No puede votar")
    document.getElementById('out-t2').textContent = '> ' + (temp > 30 ? "Calor" : temp > 15 ? "Templado" : "Frío")
}