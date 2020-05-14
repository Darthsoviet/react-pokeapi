import React, { useEffect, useState } from 'react';
import { PokemonCard } from "./PokemonCard"
import { render } from 'react-dom';

export const Pokemons = () => {

    let url = "https://pokeapi.co/api/v2/pokemon";
    const [lista, setlista] = useState([]);
    const [siguiente, setsiguiente] = useState("");
    const [anterior, setanterior] = useState("");
    const [shiny, setshiny] = useState(false);

    const getPokemons = async (url) => {
        let response = await fetch(url, { method: "GET" });
        response = await response.json();
        return response;



    }
    const toggleShiny = () => {
        setshiny(!shiny);
        getPokemons(url).then(pintarLista);    }

    const siguienteHandleOnClick = () => {
        getPokemons(siguiente).then(pintarLista);

    }

    const anteriorHandleOnClick = () => {
        getPokemons(anterior).then(pintarLista);

    }



    const pintarLista = (data) => {

        setsiguiente(data.next);
        setanterior(data.previous);
        let temp = data.results.map((elemento, i) => {



            return <PokemonCard url={elemento.url} shiny={shiny} key={i} />
        });

        setlista(temp);

    }

    useEffect(() => {
        getPokemons(url).then(pintarLista);

    }, [setlista, url]);
    return (
        <main>
            <ul className={"listaPokemons"}>
                {lista}
            </ul>
            <div className="botones">
                <button className="anterior" onClick={anteriorHandleOnClick} >Anterior</button>
                <button className="siguiente" onClick={siguienteHandleOnClick} >Siguiente</button>

            </div>
            <button onClick={toggleShiny} name="shiny" id="shiny">hola</button>


        </main>

    );
}
