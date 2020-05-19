// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { Redirect } from "react-router-dom";

export const PokemonesUsuario = (props) => {
   // eslint-disable-next-line
    const { userPokemons, setUserPokemons, equipoActual, setEquipoActual } = props;
  
  // eslint-disable-next-line
    const pintarPokemones = (lista) => {
        let listaComponentes = lista.map((pokemon, i) => {

            return (<li key={i} >
                <Card shiny={pokemon.shiny} pokemon={pokemon} />
            </li>)
        });
        return listaComponentes
    }
   


    if (userPokemons.length === 0 && equipoActual.length === 0) {
        return (<Redirect to="/" />);
    }

    
    console.log(equipoActual);
    
 
    return (
        <main>
            <ul>
        
            </ul>
            <ul>

            </ul>

        </main>
    );

}