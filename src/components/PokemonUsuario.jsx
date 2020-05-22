import React from 'react'
import pokeball from "../assets/img/pokeball.png";
import { withRouter } from 'react-router-dom';


export const PokemonUsuario = withRouter((props) => {

    const { pokemon } = props;

   



    const selectorImagen = () => {
        if (pokemon.shiny && pokemon.sprites.back_shiny) {
            
            return (pokemon.sprites.back_shiny);
        } else if (pokemon.sprites.back_default) {
           

            return (pokemon.sprites.back_default);
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

