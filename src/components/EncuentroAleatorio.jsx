import React, { useState, useLayoutEffect, useCallback, useRef, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { PokemonSalvaje } from "./PokemonSalvaje";
import { PokemonEntrenado } from "../js/PokemonEntrenado";
import { PokemonUsuario } from "./PokemonUsuario"
import { escogerMoivmientos, getPokemon } from "../js/Pokemon";
import pokeball from "../assets/img/pokeball.png";
import { MovimientoAprendido } from "../js/MovimientoAprendido";
import { switchTipo } from "../js/selectorTipo";



export const EncuentroAleatorio = withRouter((props) => {
    // eslint-disable-next-line
    const { dataList, equipoActual, setPokemonCapturado, history } = props;

    const urlBase = "https://pokeapi.co/api/v2/pokemon/";

    const [captura, setCaptura] = useState(false)
    const [poken, setPoken] = useState({});
    const [bg, setBg] = useState("");
    const [pokemon, setpokemon] = useState(new PokemonEntrenado());
    const indice = useRef(0)
    const [pokemonActual, setPokemonActual] = useState(equipoActual[indice.current] || new PokemonEntrenado());
    const [derrota, setDerrota] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0)
    const [continuar, setContinuar] = useState(false);
    const [movimientos, setMovimientos] = useState([]);
    const [movimiento, setMovimiento] = useState(new MovimientoAprendido());
    const [movimientoOponente, setMovimientoOponente] = useState(null)


    const movimientoPoderoso = useCallback((movimientosOponent) => {

        var aux = movimientosOponent[0]
        movimientosOponent.forEach((move) => {
            console.log(move);
            
            if (move.power != null) {


                aux = { ...move };

            }
        })

        return Object.assign(new MovimientoAprendido(), aux);


    }, [])

    useLayoutEffect(() => {

        let urlPokemon = tirarDado();
        setPoken(document.getElementById("poke"));
        const abortController = new AbortController();
        const signal = abortController.signal;
        if (equipoActual.length > 0) {
            getPokemon(urlPokemon, dataList, signal)
                .then(
                    async (data) => {

                        let { name, id, types, sprites, abilities,
                            moves, weight, height, stats } = data;
                        let movimientosAprendidos = await escogerMoivmientos(moves, dataList);
                        let aux = new PokemonEntrenado(name, id, types, sprites, abilities,
                            moves, weight, height, stats);
                        aux.setMovimientosAprendidos(movimientosAprendidos);

                        setpokemon(aux);
                       

                        console.log("render");
                    }).catch(e => { return e });
            devolverBG();

        } else {
            history.push("/iniciacion")
        }
        return () => {
            abortController.abort();
        }
    }, [equipoActual.length, dataList, history, movimientoPoderoso])


    const atacarJugador = useCallback((movimiento) => {

        let danio = pokemon.atacar(pokemonActual, movimiento);
        let auxHP = pokemonActual.hp - danio;
        if (auxHP < 0) {
            auxHP = auxHP + auxHP * -1
        }


        setPokemonActual(Object.assign(new PokemonEntrenado(), { ...pokemonActual, hp: auxHP }))
        if (pokemonActual.hp <= 0) {
            if (indice.current < equipoActual.length - 1) {
                if (indice.current < 3) {
                    setContinuar(false)
                    setPokemonActual(equipoActual[indice.current + 1]);
                    indice.current += 1

                }
            } else {
                setDerrota(true);
                alert("derrota")
                history.push("/misPokemons");
            }
        }





    }, [pokemon, pokemonActual, equipoActual, indice, history])


    const positionChangeX = () => {
        let aux = Math.random() * 80;

        setX(aux)

    }

    const positionChangeY = () => {
        let aux = Math.random() * 80;

        setY(aux)



    }





    useEffect(() => {
        let id;
        setMovimientos(iterarMovimientos(pokemonActual.movimientosAprendidos))

        if (continuar) {
            const procesoConstante = () => {
                positionChangeX();
                positionChangeY();

                if (pokemonActual.movimientosAprendidos) {
                    setMovimientoOponente(pokemonActual.movimientosAprendidos)
                    atacarJugador(movimientoPoderoso(movimientoOponente||pokemonActual.movimientosAprendidos))
                }

            }

            if (!captura || !derrota) {
                id = setInterval(procesoConstante, 1000);

            }
        }
        console.log("render");

        return () => {
            if (id) {
                clearInterval(id);
            }

        }
        
    }, [atacarJugador, captura, continuar, derrota, pokemonActual.movimientosAprendidos,movimientoPoderoso,movimientoOponente]);



    const tirarDado = () => {

        let numeroPokedex = Math.random() * 807;
        let pokedex = Math.round(numeroPokedex);

        return urlBase + pokedex + "/"

    }



    const capturarPokemon = (movimiento) => {
        if (continuar) {

            let daño = pokemonActual.atacar(pokemon, movimiento);
            console.log("se uso" + movimiento.name + " daño = " + daño);

            let auxHp = pokemon.hp - daño;
            if (auxHp < 0) {
                auxHp = auxHp + auxHp * -1;
            }
            setpokemon(Object.assign(new PokemonEntrenado(), { ...pokemon, hp: auxHp }));
            if (pokemon.hp - daño < 0) {
                setCaptura(true);

                if (captura) {
                    let ball = document.getElementById("ball");
                    ball.style.right = poken.style.right + 10 + "px";
                    ball.style.top = poken.style.top + 10 + "px";


                    //Se convierte el objeto pokemon que en el proceso se conviertio en un JSON
                    //a un objeto de tipo pokemon entrenado nuevamente
                    setPokemonCapturado(Object.assign(new PokemonEntrenado(), { ...pokemon, hp: pokemon.hpMax }));

                    setTimeout(() => {
                        alert("capturado");

                        history.push("/bautizo");

                    }, 400);


                }
            }
        }
    }


    const iterarMovimientos = (movimientos) => {
        let listaMoves = movimientos.map((movimientoJson, i) => {
            let move = Object.assign(new MovimientoAprendido(), movimientoJson);
            return (
                <li onClick={
                    () => {
                        setMovimiento(move)
                        setContinuar(true)
                    }


                } key={i}>

                    <span>{move.name}</span>
                    <span>{move.damage_class.name}</span>
                    <span style={{ color: switchTipo(move.type.name) }}>{move.type.name}</span>

                </li>
            );

        })
        return listaMoves;

    }



    const devolverBG = () => {
        let aux = Math.random() * 100;
        if (aux >= 0 && aux <= 33) {
            setBg("url(https://images7.alphacoders.com/662/662102.png)");
            return "url(https://images7.alphacoders.com/662/662102.png)";
        } else if (aux <= 66 && aux > 33) {
            setBg("url(https://i.pinimg.com/474x/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411--wallpaper-pack-beach-wallpaper.jpg)");
            return "url(https://i.pinimg.com/474x/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411--wallpaper-pack-beach-wallpaper.jpg)";
        } else if (aux > 66) {
            setBg("url(https://i.pinimg.com/originals/a5/46/d8/a546d8368c493759dfd3e9f9fc30b515.jpg)");
            return "url(https://i.pinimg.com/originals/a5/46/d8/a546d8368c493759dfd3e9f9fc30b515.jpg)";
        }
    }


    if (equipoActual.length === 0) {
        return <Redirect to="/iniciacion" />

    }

    return (

        <main>
            <div className="escenario" style={{
                backgroundImage: bg,
                cursor:
                    captura ?
                        "url(http://www.rw-designer.com/cursor-extern.php?id=27134),auto" : "inherit"
            }}>
                <img id="ball" style={{ display: captura ? "block" : "none" }} className="ball" src={pokeball} alt="pokeball" />


                <div className="interno">

                    <div id="poke" className="contenedor" onClick={() => { capturarPokemon(movimiento) }}
                        style={{

                            right: x + "%",
                            top: y + "%",
                            cursor:
                                captura ?
                                    "url(http://www.rw-designer.com/cursor-extern.php?id=27134),auto" : "url(http://www.rw-designer.com/cursor-extern.php?id=17388),auto"
                        }}
                    >
                        <PokemonSalvaje pokemon={pokemon} captura={captura} />
                    </div>
                    <div className="contenedor_usuario">
                        <PokemonUsuario pokemon={pokemonActual} />

                    </div>
                    <div className="movimientos">
                        <ul>
                            {movimientos}
                        </ul>
                    </div>
                </div>
            </div>
        </main>

    );

});
//fin del componente