import React, { useEffect, useState, useCallback } from 'react';
import { PokemonCard } from "./PokemonCard";
import { withRouter } from 'react-router-dom';

export const TipoPokemon = withRouter((props) => {
    
    let url="https://pokeapi.co/api/v2/type/";
    let tipo= props.match.params.tipo;
    const [lista, setlista] = useState([]);
    const [shiny, setshiny] = useState(false);

    const getPokemons = async (url) => {
        let response = await fetch(url, { method: "GET" });
        response = await response.json();
        
        return response;



    }

    const toggleShiny = async () => {
        setshiny(!shiny);
           
           
       }

    const pintarLista =useCallback((data)=> {
            
            let temp = data.pokemon.map((elemento, i) => {
                return <PokemonCard url={elemento.pokemon.url} shiny={shiny} key={i} />
            });

            setlista(temp);

    },[shiny]);

    useEffect(() => {
        getPokemons(url+tipo).then(pintarLista);

    }, [setlista,url,tipo,pintarLista]);
    return (
        <>
        <main>
            <ul className={"listaPokemons"}>
                {lista}
            </ul>
            
            <div className="botones">
                <button style={{margin:"0 auto"}} className={`fixed-bottom ${shiny}`}  onClick={toggleShiny} name="shiny" id="shiny" >shiny</button>

            </div>

        </main>
        </>

    );
});
