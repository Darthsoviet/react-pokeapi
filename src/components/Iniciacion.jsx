import React, { useEffect, useState, useCallback } from "react";
import { escogerMoivmientos, getPokemon } from "../js/Pokemon";
import { PokemonEntrenado } from "../js/PokemonEntrenado";
import { Card } from "./Card"
import { withRouter } from "react-router-dom";



export const Iniciacion = withRouter((props) => {
    const { dataList, setPokemonCapturado, history } = props;
    const urlBase1 = "https://pokeapi.co/api/v2/pokemon/1/";
    const urlBase2 = "https://pokeapi.co/api/v2/pokemon/4/";
    const urlBase3 = "https://pokeapi.co/api/v2/pokemon/7/";
    const [pokemons, setPokemons] = useState([])






    const selecionarPokemon = useCallback((pokemon) => {
        
        setPokemonCapturado(pokemon);
        
            
            
            history.push("/bautizo")

     

    }, [history, setPokemonCapturado]);

    const pintarIniciales = useCallback((lista) => {


        let listaPoke = lista.map((pokemon, i) => {


            return (
                <li key={i} onClick={() => {

                    selecionarPokemon(pokemon)
                }}>
                    <Card pokemon={pokemon} shiny={false} />
                </li>
            )

        })
        return listaPoke;

    }, [selecionarPokemon])



    useEffect(() => {
        let abortController = new AbortController();
        let signal = abortController.signal;
        let listaPokemons = []
        async function effect() {

            async function fetching(url, lista) {
                let datos = await getPokemon(url, dataList, signal)
                let { name, id, types, sprites, abilities, moves, weight, height, stats } = datos
                let pokemon = new PokemonEntrenado(name, id, types, sprites, abilities, moves, weight, height, stats);


                lista.push(pokemon);
                return lista;
            }

            listaPokemons = await fetching(urlBase1, listaPokemons);
            listaPokemons = await fetching(urlBase2, listaPokemons);
            listaPokemons = await fetching(urlBase3, listaPokemons);


            let temp = pintarIniciales(listaPokemons);

            setPokemons(temp);


        }

        effect();
        console.log("render");
        return () => {
            abortController.abort();
        }

    }, [dataList, pintarIniciales]);





    return (
        <>
            <main>
                <ul className="lista-iniciacion">
                    {pokemons}
                </ul>
            </main>



        </>
    );
});