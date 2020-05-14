export const selectorTipo = (list) => {
    let tipo;
    if (list) {
        list.forEach(element => {
            if (element.slot === 1) {
                tipo = element.type.name;
            }
        });
    }
    return switchTipo(tipo);




}
export const switchTipo = (tipo) => {


    switch (tipo) {
        case "fly":
            return "deepskyblue";

        case "fire":
            return "orange";
        case "dragon":
            return "#2153bf"
        case "electric":
            return "yellow";
        case "water":
            return "blue";
        case "grass":
            return "#0af775"
        case "bug":
            return "#7dc902"
        case "normal":
            return "gray"
        case "poison":
            return "#980af7"
        case "ground":
            return "#b3773b"
        case "rock":
            return "#949370"
        case "fairy":
            return "rgb(255,170,234)"
        case "dark":
            return "#161616"

        case "psychic":
            return "#ff03d1"

        case "fighting":
            return "#ff171f"
        case "ghost":
            return "#1a2a4d"
        case "ice":
            return "#00f2ea"
        case "steel":
            return "#003238"
        default:
            return null;
    }
}