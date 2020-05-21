import React, { useState, useEffect } from "react";
import { withRouter,Redirect } from "react-router-dom";
import { PokemonSalvaje } from "./PokemonSalvaje";
import { PokemonEntrenado } from "../js/PokemonEntrenado";

import pokeball from "../assets/img/pokeball.png";


export const EncuentroAleatorio = withRouter((props) => {
// eslint-disable-next-line
    const { dataList, setDataList,userPokemons,equipoActual,setPokemonCapturado, history } = props;

    const urlBase = "https://pokeapi.co/api/v2/pokemon/";

    const [urlPokemon, setUrlPokemon] = useState(urlBase);
    const [id, setId] = useState(0);
    const [captura, setCaptura] = useState(false)
    const [poken, setPoken] = useState({});
    const [bg, setBg] = useState("");
    const [pokemon, setpokemon] = useState(new PokemonEntrenado());
    const [x, setX] = useState(0);
    const [y, setY] = useState(0)


    useEffect(() => {
        setPoken(document.getElementById("poke"));
        let idx;
        let idy;
        if (!captura) {
            idx = setInterval(positionChangeX, 1500);
            idy = setInterval(positionChangeY, 1500);
            devolverBG();
        }
        
        console.log("render");




        return () => {
            if (idx || idy) {
                clearInterval(idx);
                clearInterval(idy);
            }


        };
    }, [captura]);
    


    const tirarDado = () => {

        let numeroPokedex = Math.random() * 807;
        let pokedex = Math.round(numeroPokedex);
        setUrlPokemon(urlBase + pokedex + "/");
        setId(pokedex);
        return pokedex

    }



    const capturarPokemon = (atk=10) => {

        let auxHp=pokemon.hp-atk;
        if(auxHp<0){
            auxHp=auxHp+auxHp*-1
        }
        setpokemon({...pokemon,hp:auxHp})
        if (pokemon.hp-atk<= 0) {
            setCaptura(true);

            if (captura) {
                let ball = document.getElementById("ball");
                ball.style.right = poken.style.right;
                ball.style.top = poken.style.top;
                setPokemonCapturado(pokemon);

                setTimeout(() => {
                    alert("capturado");

                    history.push("/bautizo");

                }, 500);


            }
        }
    }

    

    
    const positionChangeX = () => {
        let aux = Math.random() * 80;

        setX(aux)

    }

    const positionChangeY = () => {
        let aux = Math.random() * 80;

        setY(aux)

       

    }

    
    const devolverBG=()=>{
        let aux=Math.random()*100;
        if(aux >=0 && aux <=33){
            setBg("url(https://images7.alphacoders.com/662/662102.png)");
            return "url(https://images7.alphacoders.com/662/662102.png)";
        }else if(aux<=66 &&aux>33){
            setBg("url(https://i.pinimg.com/474x/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411--wallpaper-pack-beach-wallpaper.jpg)");
            return "url(https://i.pinimg.com/474x/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411--wallpaper-pack-beach-wallpaper.jpg)";
        }else if(aux>66){
            setBg("url(https://i.pinimg.com/originals/a5/46/d8/a546d8368c493759dfd3e9f9fc30b515.jpg)");
            return "url(https://i.pinimg.com/originals/a5/46/d8/a546d8368c493759dfd3e9f9fc30b515.jpg)";
        }
    }
    if(equipoActual.length===0){
        return <Redirect to="/iniciacion"/>
        
    }
    
    return (

        <main>
            <div className="escenario" style={{
                backgroundImage:bg,
                cursor:
                    captura ?
                        "url(http://www.rw-designer.com/cursor-extern.php?id=27134),auto" : "inherit"
            }}>
                <img id="ball" style={{ display: captura ? "block" : "none" }} className="ball" src={pokeball} alt="pokeball" />


                <div className="interno">

                    <div id="poke" className="contenedor" onClick={()=>{capturarPokemon(10)}}
                        style={{
                            
                            right: x+"%",
                            top: y+"%",
                            cursor:
                                captura ?
                                    "url(http://www.rw-designer.com/cursor-extern.php?id=27134),auto" : "url(http://www.rw-designer.com/cursor-extern.php?id=17388),auto"
                        }}
                    >
                        <PokemonSalvaje pokemon={pokemon} setpokemon={setpokemon} captura={captura} dataList={dataList} setDataList={setDataList} url={urlPokemon === urlBase ? tirarDado() : urlPokemon} />

                    </div>
                </div>
            </div>
        </main>

    );

});//fin del componente