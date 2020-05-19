import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Pokemon, getPokemon } from "../js/Pokemon";
import {Card} from "./Card"


export const PokemonCard = withRouter((props) => {
    const { dataList, shiny } = props;
    const { url } = props;
    const { history } = props;
    const [pokemon, setpokemon] = useState(new Pokemon());





    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;


        getPokemon(url, dataList, signal)
            .then(
                (data) => {

                    let { name, id, types, sprites, stats } = data;
                    let aux = new Pokemon(name, id, types, sprites, null, null, null, null, stats);

                    setpokemon(aux);

                    console.log("render");

                });
        console.log("render");

        return () => {
            abortController.abort();
        }

    },
        [url, dataList]);






    const irPokemon = (id) => {

        history.push(`/pokemon/${id}`);
    }

    return (

        <li onClick={()=>{irPokemon(pokemon.id)}}>
            <Card pokemon={pokemon} shiny={shiny}/>
        </li>


    );





});
