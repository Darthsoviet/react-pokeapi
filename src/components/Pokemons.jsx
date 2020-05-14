import React, { useEffect, useState,useCallback } from 'react';
import { PokemonCard } from "./PokemonCard"

export const Pokemons = () => {


    const [url, seturl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [lista, setlista] = useState([]);
    const [siguiente, setsiguiente] = useState("");
    const [anterior, setanterior] = useState("");
    const [shiny, setshiny] = useState(false);

    const getPokemons = async (url) => {
        let response = await fetch(url, { method: "GET" });
        response = await response.json();
        return response;



    }
    const toggleShiny = async () => {
     setshiny(!shiny);
        
        
    }

    const siguienteHandleOnClick = () => {
        seturl(siguiente);
        getPokemons(siguiente).then(pintarLista);



    }

    const anteriorHandleOnClick = () => {
        seturl(anterior);
        getPokemons(anterior).then(pintarLista);

    }


    
    const pintarLista = useCallback((data) => {
        setsiguiente(data.next);
        setanterior(data.previous);
        let temp = data.results.map((elemento, i) => {



            return <PokemonCard url={elemento.url} shiny={shiny} key={i} />
        });
        setlista(temp);


    },[shiny]);

    useEffect(() => {
        getPokemons(url).then(pintarLista);

    }, [setlista, url,pintarLista]);
    return (
        <main>
            <ul className={"listaPokemons"}>
                {lista}
            </ul>
            <div className="botones">
                <button className="anterior" onClick={anteriorHandleOnClick} >Anterior</button>
                <button style={{margin:"0 auto"}} className={`${shiny}`}  onClick={toggleShiny} name="shiny" id="shiny" >shiny</button>
                <button className="siguiente" onClick={siguienteHandleOnClick} >Siguiente</button>

            </div>



        </main>

    );
}
