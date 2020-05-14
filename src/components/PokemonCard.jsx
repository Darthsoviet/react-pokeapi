import React, { useEffect, useState } from 'react'

export const PokemonCard = (props) => {
    const { url } = props;
    const [pokemon, setpokemon] = useState({ name: "", id: "", types: [], sprites: {} });



    useEffect(() => {
        let getPokemon = async () => {
            let data;

            if (!sessionStorage.getItem(url)) {

                let response = await fetch(url);

                response = await response.json();
                let { name, id, types, sprites } = response;
                data = { name, id, types, sprites }
                sessionStorage.setItem(url, JSON.stringify(data));

                return data

            } else {
                data = JSON.parse(sessionStorage.getItem(url));
                return data;
            }

        }
        getPokemon()
            .then(
                (data) => {

                    let { name, id, types, sprites } = data;

                    setpokemon({
                        "name": name,
                        "id": id,
                        "types": types,
                        "sprites": sprites
                    })

                });

    },
        [setpokemon, url]);


    const selectorTipo = () => {
        let tipo;
        if (pokemon.types) {
            pokemon.types.forEach(element => {
                if (element.slot === 1) {
                    tipo = element.type.name;
                }
            });
        }

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

    if (props.shiny && pokemon.sprites.front_shiny) {
        return (
            <li className={"cartaPokemon"}>
                <h3 style={{ "backgroundColor": selectorTipo() }} className={"nombrePokemon"}>{pokemon.name}</h3>
                <h3 className={"idPokemon"}>{pokemon.id}</h3>
                <img src={pokemon.sprites.front_shiny} />
            </li>
        );
    } else {

    return (

            <li className={"cartaPokemon"}>
                <h3 style={{ "backgroundColor": selectorTipo() }} className={"nombrePokemon"}>{pokemon.name}</h3>
                <h3 className={"idPokemon"}>{pokemon.id}</h3>
                <img src={pokemon.sprites.front_default} />
            </li>
    );
}



}


