// eslint-disable-next-line
import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { Card } from "./Card";
import { Redirect } from "react-router-dom";

export const PokemonesUsuario = (props) => {
    // eslint-disable-next-line
    const { userPokemons, setUserPokemons, equipoActual, setEquipoActual } = props;
    const [componentePokemons, setComponentePokemons] = useState([]);
    const [componenteEquipo, setComponenteEquipo] = useState([]);


    const shinyStyle = (shiny) => {
        if (shiny) {
            return { border: "2px gold solid" }
        }
    }

    //--------------------------------------------------------------------------
    const pintarPokemonesEquipo = useCallback((lista) => {
        console.log("pintando", lista);

        let listaComponentes = lista.map((pokemon, i) => {
            return (
                <li style={shinyStyle(pokemon.shiny)} onClick={
                    () => {
                        if (lista.length - 1 === i) {
                            let listaAux=[...equipoActual]

                            let aux = listaAux.pop()

                            setUserPokemons([...userPokemons, aux]);
                            setEquipoActual(listaAux)
                        } else if (lista.length > 1 && i === 0) {
                            let listaAux=[...equipoActual]


                            let aux = listaAux.shift();

                            setUserPokemons([...userPokemons, aux]);
                            setEquipoActual(listaAux)


                        }
                        else {

                            let listaAux=[...equipoActual]

                            let aux = listaAux.splice(i, i);
                            
                            setUserPokemons([...userPokemons, aux[0]]);
                            setEquipoActual(listaAux)


                        }

                    }} key={i} >
                    <Card shiny={pokemon.shiny} pokemon={pokemon} />
                </li>)
        });
        return listaComponentes
    }, [setEquipoActual, setUserPokemons, userPokemons,equipoActual])
    //------------------------------------------------------------------
    const pintarPokemonesUsuario = useCallback((lista) => {
        let listaComponentes = lista.map((pokemon, i) => {
            return (

                <li style={shinyStyle(pokemon.shiny)}
                    onClick={
                        () => {
                            if (equipoActual.length < 3) {
                                if (lista.length - 1 === i) {
                                    let listaAux=[...userPokemons]


                                    let aux = listaAux.pop()
                                    // listaNueva.push(aux)

                                    setUserPokemons(listaAux);
                                    setEquipoActual([...equipoActual, aux])
                                    console.log("team", equipoActual);

                                } else if (lista.length > 1 && i === 0) {
                                    let listaAux=[...userPokemons]

                                    let aux = listaAux.shift();


                                    setUserPokemons(listaAux);
                                    setEquipoActual([...equipoActual, aux]);



                                } else {
                                    let listaAux=[...userPokemons]

                                    let aux = listaAux.splice(i, i );


                                    setUserPokemons(listaAux);
                                    setEquipoActual([...equipoActual, aux[0]]);

                                }
                            }
                        }}
                    key={i} >
                    <Card shiny={pokemon.shiny} pokemon={pokemon} />
                </li>)
        });
        return listaComponentes
    }, [equipoActual, setEquipoActual, setUserPokemons,userPokemons]);

    //------------------------------------------------------------------


    useLayoutEffect(() => {
        setComponenteEquipo(pintarPokemonesEquipo(equipoActual));
        setComponentePokemons(pintarPokemonesUsuario(userPokemons));
        console.log("pokemones usuario ,", userPokemons);

        console.log("render pokemones");

    }, [equipoActual, userPokemons, pintarPokemonesEquipo, pintarPokemonesUsuario])





    if (userPokemons.length === 0 && equipoActual.length === 0) {
        return (<Redirect to="/" />);
    }




    return (
        <main className="mainMisPokemons">
            <section>
                <h2>
                    Pokemones Capturados
            </h2>
                <ul className="misPokemons">
                    {componentePokemons}
                </ul>

            </section>

            <aside>
                <h2>Equipo Actual</h2>
                <ul>
                    {componenteEquipo}
                </ul>

            </aside>


        </main>
    );

}