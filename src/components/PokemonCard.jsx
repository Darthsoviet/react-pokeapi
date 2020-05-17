import React, { useEffect, useState, useCallback } from 'react'
import pokeball from "../assets/img/pokeball.png";
import { withRouter } from 'react-router-dom';
import { selectorTipo } from "../js/selectorTipo";


export const PokemonCard = withRouter((props) => {
    const {dataList} =props;
    const { url } = props;
    const { history } = props;
    const [pokemon, setpokemon] = useState({ name: "", id: "", types: [], sprites: {}, abilities: [], moves: [], weight: "", height: "" });



    let getPokemon = useCallback(async (signal) => {
        
        let data;

        if (!dataList.get(url)) {

            let response = await fetch(url,{signal});

            response = await response.json();
            let { name, id, types, sprites } = response;
            data = { name, id, types, sprites}

            if(dataList.size>200){

               
             dataList.clear();
            }
            
            dataList.set(url, JSON.stringify(data));
           
           
            

            return data

        } else {
            
            
            data = JSON.parse(dataList.get(url));
            
            return data;
        }
    }, [url,dataList]);


    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;


        getPokemon(signal)
            .then(
                (data) => {

                    let { name, id, types, sprites} = data;

                    setpokemon({
                        "name": name,
                        "id": id,
                        "types": types,
                        "sprites": sprites,
                       

                    })

                });
              
    },
        [setpokemon, url, getPokemon,dataList]);


    const irPokemon = () => {

        history.push(`/pokemon/${pokemon.id}`);
    }

    const selectorImagen = () => {
        if (props.shiny && pokemon.sprites.front_shiny) {
            return (pokemon.sprites.front_shiny);
         } else if (pokemon.sprites.front_default) {
             return (pokemon.sprites.front_default);
        }
        else {
            return (pokeball);
        }

    }


    return (

        <li onClick={irPokemon} className={"cartaPokemon"}>
            <h3 style={{ "backgroundColor": selectorTipo(pokemon.types) }} className={"nombrePokemon"}>{pokemon.name}</h3>
            <h3 className={"idPokemon"}>{pokemon.id}</h3>
            <img src={selectorImagen()} alt="" />

        </li>

    );





});


