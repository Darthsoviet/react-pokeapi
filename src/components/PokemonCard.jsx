import React, { useEffect, useState, useCallback } from 'react'
import pokeball from "../assets/img/pokeball.png";
import { withRouter } from 'react-router-dom';
import { selectorTipo } from "../js/selectorTipo";


export const PokemonCard = withRouter((props) => {
    const { url } = props;
    const { history } = props;
    const [pokemon, setpokemon] = useState({ name: "", id: "", types: [], sprites: {}, abilities: [], moves: [], weight: "", height: "" });



    let getPokemon = useCallback(async () => {
        let data;

        if (!sessionStorage.getItem(url)) {

            let response = await fetch(url);

            response = await response.json();
            let { name, id, types, sprites, moves, abilities, height, weight } = response;
            data = { name, id, types, sprites, abilities, moves, weight, height }
            sessionStorage.setItem(url, JSON.stringify(data));

            return data

        } else {
            data = JSON.parse(sessionStorage.getItem(url));
            return data;
        }
    }, [url]);


    useEffect(() => {


        getPokemon()
            .then(
                (data) => {

                    let { name, id, types, sprites, abilities, moves, weight, height } = data;

                    setpokemon({
                        "name": name,
                        "id": id,
                        "types": types,
                        "sprites": sprites,
                        "abilities": abilities,
                        "moves": moves,
                        "weight": weight,
                        "height": height

                    })

                });

    },
        [setpokemon, url, getPokemon]);


    const irPokemon = () => {

        history.push(`/pokemon/${pokemon.id}`);
    }

    const selectorImagen = () => {
        if (props.shiny && pokemon.sprites.front_shiny) {
            return (pokemon.sprites.front_shiny);
        } else if (pokemon.sprites.front_default != null) {
            return (pokemon.sprites.front_default);
        }
        else {
            return (pokeball);
        }

    }


    return (

        <li onClick={irPokemon} className={"cartaPokemon"}>
            <h3 style={{ "backgroundColor": selectorTipo(pokemon.types) }} className={"nombrePokemon"}>{pokemon.name}</h3>
            <h3 className={"idPokemon"}>{pokemon.id}</h3>
            <img src={selectorImagen()} alt="" />

        </li>

    );





});


