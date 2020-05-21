import React, { useEffect } from 'react'
import pokeball from "../assets/img/pokeball.png";
import { withRouter } from 'react-router-dom';
import { PokemonEntrenado } from "../js/PokemonEntrenado";
import { escogerMoivmientos ,getPokemon} from "../js/Pokemon";


export const PokemonSalvaje = withRouter((props) => {

    const { dataList, url, captura, pokemon, setpokemon } = props;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;


        getPokemon(url,dataList,signal)
            .then(
                async (data) => {
                    let aux;

                    let {name, id, types, sprites,abilities, 
                        moves,weight,height, stats } = data;
                     let movimientosAprendidos = await escogerMoivmientos(moves,dataList);


                    aux = new PokemonEntrenado(name, id, types, sprites,abilities, 
                    moves,weight,height, stats);
                    
                    aux.setHP();

                    

                    aux.setMovimientosAprendidos(movimientosAprendidos);


                    setpokemon(aux)
                    console.log("render");

                });



    },
        [setpokemon, url, dataList]);





    const selectorImagen = () => {
        if (props.shiny && pokemon.sprites.front_shiny) {
            if (captura && pokemon.sprites.back_shiny) {
                return pokemon.sprites.front_shiny;
            }
            return (pokemon.sprites.front_shiny);
        } else if (pokemon.sprites.front_default) {
            if (captura && pokemon.sprites.back_default) {
                return pokemon.sprites.back_default;

            }

            return (pokemon.sprites.front_default);
        }
        else {
            return (pokeball);
        }

    }

    const medidorSalud = (hp, maxHp) => {
        if (hp < maxHp * 0.8 && hp >= maxHp * 0.5) {
            return "greenyellow";
        } else if (hp < maxHp * 0.5 && hp >= maxHp * 0.2) {
            return "goldenrod";
        } else if (hp <= maxHp * 0.19) {
            return "crimson";
        }
    }
    const colorShiny = (shiny) => {
        if (shiny) {
            return " 1px solid gold";
        } else {
            return "1px solid black";
        }
    }

    return (
        <>
            <div>
                        Lv {pokemon.nivel}
                    </div>
            <div className="contenedor-barra" style={
                {
                    border: colorShiny(pokemon.shiny)
                }}>
                    
                <div className="barra"
                    style={
                        {
                            width: (pokemon.hp * 100 / pokemon.hpMax) + "%",
                            backgroundColor: medidorSalud(pokemon.hp, pokemon.hpMax)
                        }
                    }
                >


                </div>
            </div>

            <img className={"salvaje"} src={selectorImagen()} alt="" />
        </>


    );





});

