let expr = "mangos"

switch (expr){
    case "mangos":
        console.log("Los mangos x2 cuestan $1")
        break;
    case "naranjas":
        console.log("Las naranjas x10 cuestan $1")
        break;
    case "manzanas":
        console.log("Las naranjas x5 cuestan $1")
        break;
    default:
        console.log(`Lo siento, no tenemos ${expr}`)
        break;
}

console.log("¿Quiere comprar algo adicional?")