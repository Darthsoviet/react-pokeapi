import React, { useEffect, useState } from 'react';
import pokeball from "../assets/img/pokeball.png";
import { withRouter } from "react-router-dom";
import { selectorTipo, switchTipo } from "../js/selectorTipo";
import { Pokemon as PokemonObject, getPokemon } from "../js/Pokemon";


export const Pokemon = withRouter((props) => {

    const { history } = props;
    let { id } = props.match.params;
    const { dataList } = props;
    const [shiny, setshiny] = useState(false);
    const [tipo, setTipo] = useState([]);
    const [pokemon, setpokemon] = useState(new PokemonObject());
    const [movimiento, setMovimiento] = useState([]);
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const [habilidad, sethabilidad] = useState([]);





    useEffect(() => {
       
            const abortController = new AbortController();
            const signal = abortController.signal;

            getPokemon(url,dataList, signal).then(
                (pokemon) => {

                    let aux
                    let { name, id, types, sprites, abilities, moves, weight, height, stats } = pokemon;


                    aux = new PokemonObject(name, id, types, sprites, abilities, moves, weight, height, stats);

                    setpokemon(aux);
                    sethabilidad(iterarHabilidades(abilities));
                    setMovimiento(iterarMovimientos(moves));
                    setTipo(iterarTipos(types));

                })
           



        return () => {
            abortController.abort();

        }


    },
        [url, dataList]);


    const selectorImagen = () => {
        if (shiny && pokemon.sprites.front_shiny) {
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
                <li style={{ "color": switchTipo(tipo.type.name) }} key={i}>
                    {tipo.type.name}
                </li>
            );

        });

        return listaHabilidades
    }

    const toggleShiny = async () => {


        setshiny(!shiny);
    }


    const avanzar = () => {
        let aux = parseInt(id) + 1;
        setUrl(`https://pokeapi.co/api/v2/pokemon/${aux}/`);
        history.push("/pokemon/" + aux);
    }
    const retroceder = () => {
        let aux = parseInt(id) - 1;
        setUrl(`https://pokeapi.co/api/v2/pokemon/${aux}/`);
        history.push("/pokemon/" + aux);

    }


    return (
        <main>
            <article className="pokemon">
                <h1 style={{ "backgroundColor": selectorTipo(pokemon.types) }} className={"nombrePokemon"}>{pokemon.name + " #" + pokemon.id} </h1>
                <div className="opciones">
                    <button className={"atras"} onClick={retroceder}>atras</button>
                    <button className={"shiny "} onClick={toggleShiny}>shiny</button>
                    <button className={"adelante"} onClick={avanzar}>adelante</button>

                </div>
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


