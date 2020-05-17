import React, { useEffect, useState, useCallback } from 'react'
import pokeball from "../assets/img/pokeball.png";
import { withRouter } from 'react-router-dom';

export const PokemonSalvaje = withRouter((props) => {

    const { dataList, url ,hp, setHp,maxHp,setMaxHp,captura} = props;
    const [pokemon, setpokemon] = useState({ sprites: {}, stats: []});
   


    let getPokemon = useCallback(async (signal) => {

        let data;

        if (!dataList.get(url)) {

            let response = await fetch(url, { signal });

            response = await response.json();
            let { sprites, stats } = response;
            data = { sprites, stats }
            if (dataList.size > 200) {
                dataList.clear();
            }
            dataList.set(url, JSON.stringify(data));

            return data

        } else {


            data = JSON.parse(dataList.get(url));

            return data;
        }
    }, [url, dataList]);
    const getHP =useCallback( (stats) => {
        stats.forEach((objeto) => {

            let hp;
            if (objeto.stat.name === "hp") {

                 hp=objeto.base_stat;
                 setHp(hp);
                 setMaxHp(hp);
                
                
            }
            return hp
        })
    },[setHp,setMaxHp])




    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;


        getPokemon(signal)
            .then(
                async (data) => {

                    let { sprites, stats } = data;
                    getHP(stats)
                    setpokemon({

                        "sprites": sprites,
                        "stats": stats,


                    })
                   
                    console.log("render");

                });
                
                
                
    },
        [setpokemon, url, getPokemon, dataList,getHP]);

   
    


    const selectorImagen = () => {
        if (props.shiny && pokemon.sprites.front_shiny) {
            if(captura && pokemon.sprites.back_shiny){
                return pokemon.sprites.front_shiny;
            }
            return (pokemon.sprites.front_shiny);
        } else if (pokemon.sprites.front_default) {
            if(captura && pokemon.sprites.back_default){
              return  pokemon.sprites.back_default;

            }
            
            return (pokemon.sprites.front_default);
        }
        else {
            return (pokeball);
        }

    }


    return (
        <>


            <meter min={0} value={hp} max={maxHp} />
            <img className={"salvaje"} src={selectorImagen()} alt="" />
        </>


    );





});

