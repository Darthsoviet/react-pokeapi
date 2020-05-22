import React, { useState, useLayoutEffect } from 'react';
import pokeball from "../assets/img/pokeball.png";
import { withRouter, Redirect } from "react-router-dom";
import { selectorTipo, switchTipo } from "../js/selectorTipo";


export const Bautizo = withRouter((props) => {

    const { history, pokemonCapturado, setPokemonCapturado, userPokemons, setUserPokemons, dataList } = props;
    const [tipos, setTipos] = useState([])
    const [habilidades, setHabilidades] = useState([])
    const [movimientos, setMovimientos] = useState([])



    useLayoutEffect(() => {

        if (pokemonCapturado) {
            setHabilidades(iterarHabilidades(pokemonCapturado.abilities));
            setTipos(iterarTipos(pokemonCapturado.types));
            setMovimientos(iterarMovimientos(pokemonCapturado.movimientosAprendidos))
            console.log(pokemonCapturado);
            
            console.log("render bautizo");

        }
}
    , [pokemonCapturado, setPokemonCapturado, dataList])




const selectorImagen = (pokemon) => {
    if (pokemon.shiny && pokemon.sprites.front_shiny) {
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
    let moves = lista.map((movimiento, i) => {

        return (
            <li key={i}>
                <h3>
                    {movimiento.name}
                </h3>
                <h4>
                    {movimiento.damage_class.name}
                </h4>
                <h4>
                    Pw{movimiento.power}
                </h4>
                <h4 style={{
                    color: switchTipo(movimiento.type.name)
                }}>
                    {movimiento.type.name}
                </h4>

            </li>
        );


    });


    return moves
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



const confirmar = async () => {

    let cambiarPagina = async () => {

        await setUserPokemons([...userPokemons, pokemonCapturado]);
        await setPokemonCapturado(null);
    }

    await cambiarPagina();
    history.push("/misPokemons")



}

if (!pokemonCapturado) {
    return (<Redirect to="/" />)
}




return (
    <main>
        <article className="pokemon">
            <h1 style={{ "backgroundColor": selectorTipo(pokemonCapturado.types) }} className={"nombrePokemon"}>
                {pokemonCapturado.name}
                {" #" + pokemonCapturado.id} </h1>
            <div className="opciones">
            </div>
            <div className="contenidoPokemon">
                <img className={"imagenPokemon"} src={selectorImagen(pokemonCapturado)} alt="pokemon" />
                <span>LV{pokemonCapturado.nivel}</span>
                <h2>Descripcion</h2>
                <div className="descripcion">
                    <div className="peso">
                        <h3>Peso</h3>
                        <span>{pokemonCapturado.weight}</span>
                    </div>
                    <div className="altura">
                        <h3>Altura</h3>
                        <span>{pokemonCapturado.height}</span>
                    </div>
                    <div className="tipo">
                        <h3>Tipos</h3>
                        <ul>
                            {tipos}
                        </ul>
                    </div>
                </div>
                <div className="stats">
                    <h1 className="stats">
                        stats
                        </h1>
                    <ul className="stats_lista">
                        <div className="hp">
                            <div style={{ height: pokemonCapturado.hpMax }} className="barra_hp float-bottom">{pokemonCapturado.hpMax}</div>
                        </div>
                        <div className="atk">
                            <div style={{ height: pokemonCapturado.atk }} className="barra_atk">{pokemonCapturado.atk}</div>
                        </div>
                        <div className="sAtk">
                            <div style={{ height: pokemonCapturado.specialAtk }} className="barra_sAtk">{pokemonCapturado.specialAtk}</div>
                        </div>
                        <div className="def">
                            <div style={{ height: pokemonCapturado.def }} className="barra_def">{pokemonCapturado.def}</div>
                        </div>
                        <div className="sDef">
                            <div style={{ height: pokemonCapturado.specialDef }} className="barra_sDef">{pokemonCapturado.specialDef}</div>
                        </div>
                        <div className="iv">
                            <div style={{ height: pokemonCapturado.iv * 150 / 45 + "px" }} className="barra_iv">
                                {pokemonCapturado.iv}
                            </div>

                        </div>
                        <h3>
                            HP
                            </h3>
                        <h3>
                            ATK
                            </h3>
                        <h3>
                            SATK
                            </h3>
                        <h3>
                            DEF
                            </h3>
                        <h3>
                            SDEF
                            </h3>
                        <h3>
                            IV
                            </h3>


                    </ul>
                </div>
                <div className="habilidades">
                    <h1>Habilidades</h1>
                    <ul>
                        {habilidades}
                    </ul>
                </div>
                <div className="movimientos">
                    <h1>Movimientos</h1>
                    <ul>
                        {movimientos}
                    </ul>
                </div>
            </div>
            <div className="botton_confirmar">
                <button onClick={confirmar} className={"confirmar"}>Confirmar</button>
            </div>
        </article>
    </main>

);

});


