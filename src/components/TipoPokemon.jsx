import React, { useEffect, useState } from 'react';
import {Redirect} from "react-router-dom";
import { PokemonCard } from "./PokemonCard"

export const TipoPokemon = (props) => {

    let url="https://pokeapi.co/api/v2/type/";
    let tipo= props.match.params.tipo;
    const [lista, setlista] = useState([]);
    const [actual, setactual] = useState("");

    const getPokemons = async (url) => {
        let response = await fetch(url, { method: "GET" });
        response = await response.json();
        
        return response;



    }

    

    const pintarLista =(data)=> {
            console.log(data.pokemon);
            
            let temp = data.pokemon.map((elemento, i) => {
                return <PokemonCard url={elemento.pokemon.url} key={i} />
            });

            setlista(temp);

    }

    useEffect(() => {
        getPokemons(url+tipo).then(pintarLista);
        setactual(tipo);

    }, [setlista,url]);
    return (
        <>
        <main>
            <ul className={"listaPokemons"}>
                {lista}
            </ul>
            
            


        </main>
        </>

    );
}
