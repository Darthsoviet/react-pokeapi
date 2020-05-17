import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { PokemonSalvaje } from "./PokemonSalvaje";
import pokeball from "../assets/img/pokeball.png";


export const EncuentroAleatorio = withRouter((props) => {
    const urlBase = "https://pokeapi.co/api/v2/pokemon/";
    const [urlPokemon, setUrlPokemon] = useState(urlBase);
    const [id, setId] = useState(0);
    const { dataList, setDataList, history } = props;
    const [shiny, setShiny] = useState(false);
    const [hp, setHp] = useState(0);
    const [maxHp, setMaxHp] = useState(0);
    const [captura, setCaptura] = useState(false)
    const [poken, setPoken] = useState({});
    const [bg, setBg] = useState("");




    const tirarDado = () => {

        let numeroPokedex = Math.random() * 807;
        let suerteShiny = Math.random() * 100;
        if (suerteShiny <= 5) {
            setShiny(true);
        }
        let pokedex = Math.round(numeroPokedex);
        setUrlPokemon(urlBase + pokedex + "/");
        setId(pokedex);
        return pokedex

    }



    const capturarPokemon = () => {
        setHp(hp - 10);
        if (hp <= 0) {
            setCaptura(true);

            if (captura) {
                let ball = document.getElementById("ball");
                ball.style.right = poken.style.right;
                ball.style.top = poken.style.top;

                setTimeout(() => {
                    alert("capturado");

                    history.push("/pokemon/" + id);

                }, 500);


            }
        }
    }

    const colorShiny = () => {
        if (shiny) {
            return " 2px solid gold";
        } else {
            return "none";
        }
    }

    const positionChangeX = () => {
        let aux = Math.random() * 80;
        let poken = document.getElementById("poke");

        if (poken) {
            poken.style.right = aux + "%";
        }


        return aux;


    }
    const positionChangeY = () => {
        let aux = Math.abs((Math.random() * 100) - 20);
        let poken = document.getElementById("poke");

        if (poken) {
            poken.style.top = aux + "%";
        }
        return aux;


    }

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
                    <div id="poke" className="contenedor" onClick={capturarPokemon}
                        style={{
                            border: colorShiny(),
                            right: positionChangeX() + "%",
                            top: positionChangeY() + "%",
                            cursor:
                                captura ?
                                    "url(http://www.rw-designer.com/cursor-extern.php?id=27134),auto" : "url(http://www.rw-designer.com/cursor-extern.php?id=17388),auto"


                        }}
                    >
                        <PokemonSalvaje captura={captura} hp={hp} maxHp={maxHp} setHp={setHp} setMaxHp={setMaxHp} dataList={dataList} setDataList={setDataList} url={urlPokemon === urlBase ? tirarDado() : urlPokemon} shiny={shiny} />

                    </div>
                </div>
            </div>
        </main>

    );

});//fin del componente