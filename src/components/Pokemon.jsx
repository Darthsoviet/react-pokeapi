import React, { useEffect, useState, useCallback } from 'react';
import pokeball from "../assets/img/pokeball.png";
import { withRouter } from 'react-router-dom';
import { selectorTipo,switchTipo } from "../js/selectorTipo";

export const Pokemon = withRouter((props) => {

    const [habilidad, sethabilidad] = useState([]);
    const { id } = props.match.params;
    const [shiny, setshiny] = useState(false);
    const [tipo, setTipo] = useState([]);
    const [pokemon, setpokemon] = useState({ name: "", id: "", types: [], sprites: {}, abilities: [], moves: [], weight: "", height: "" });
    const [movimiento, setMovimiento] = useState([]);
    let url = "https://pokeapi.co/api/v2/pokemon/" + id;

    let getPokemon = useCallback(async () => {
        let data;

        if (!sessionStorage.getItem(url)) {

            let response = await fetch(url);

            response = await response.json();
            let { name, id, types, sprites, weight, height, abilities, moves } = response;
            data = { name, id, types, sprites, weight, height, abilities, moves }
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
        sethabilidad(iterarHabilidades(pokemon.abilities));
        setMovimiento(iterarMovimientos(pokemon.moves));
        setTipo(iterarTipos(pokemon.types));

    },
        [setpokemon, url, getPokemon, pokemon]);




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
    const iterarHabilidades = (lista) => {
        let listaHabilidades = lista.map((habilidad, i) => {

            return (
                <li key={i}>
                    {habilidad.ability.name}
                </li>
            );

        });

        return listaHabilidades
    }
    const iterarMovimientos = (lista) => {
        let listaHabilidades = lista.map((movimiento, i) => {

            return (
                <li key={i}>
                    {movimiento.move.name}
                </li>
            );

        });

        return listaHabilidades
    }
    const iterarTipos = (lista) => {
        let listaHabilidades = lista.map((tipo, i) => {
            return (
                <li style={{"color":switchTipo(tipo.type.name)}} key={i}>
                    {tipo.type.name}
                </li>
            );

        });

        return listaHabilidades
    }



    return (
        <main>
            <article className="pokemon">
                <h1 style={{ "backgroundColor": selectorTipo(pokemon.types) }} className={"nombrePokemon"}>{pokemon.name + " #" + pokemon.id}</h1>



                <div className="contenidoPokemon">
                    <img className={"imagenPokemon"} src={selectorImagen()} alt="pokemon" />

                    <h2>Descripcion</h2>
                    <div className="descripcion">

                        <div className="peso">
                            <h3>Peso</h3>
                            <span>{pokemon.weight}</span>
                        </div>
                        <div className="altura">
                            <h3>Altura</h3>
                            <span>{pokemon.height}</span>

                        </div>
                        <div className="tipo">
                            <h3>Tipos</h3>
                            <ul>
                            {tipo}
                            </ul>
                          

                        </div>




                    </div>
                    <div className="habilidades">
                        <h2>Habilidades</h2>
                        <ul>
                            {habilidad}
                        </ul>
                    </div>
                    <div className="movimientos">
                        <h2>Movimientos</h2>
                        <ul>
                            {movimiento}
                        </ul>
                    </div>


                </div>



            </article>
        </main>



    );







});


