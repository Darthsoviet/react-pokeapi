import React from 'react';
import pokeball from "../assets/img/pokeball.png";
import { selectorTipo } from "../js/selectorTipo";
export const Card = (props) => {
    const { pokemon ,shiny} = props;


    const selectorImagen = () => {
        if (shiny && pokemon.sprites.front_shiny) {
            return (pokemon.sprites.front_shiny);
        } else if (pokemon.sprites.front_default) {
            return (pokemon.sprites.front_default);
        }
        else {
            return (pokeball);
        }

    }

    

    return (
        <div className={"cartaPokemon"}>
            <h3 style={{ "backgroundColor": selectorTipo(pokemon.types) }} className={"nombrePokemon"}>{pokemon.name}</h3>
            <h3 className={"idPokemon"}>{pokemon.id}</h3>
            <img src={selectorImagen()} alt="" />

        </div>
    );

}

