import React from "react";
import {withRouter} from "react-router-dom";


export const MenuTipo = withRouter((props) => {
    const { history } = props;


    const handlOnClick = () => {
        let elemento = document.getElementById("MenuTipo");
        elemento.style.width = "0%";
        elemento.style.height = "0%";


        

    }

    return (
        <div onClick={handlOnClick} id="MenuTipo">
            <div className="menuTipoInterno" id="menuTipoInterno">
                <div className="contenedor">

                    <button onClick={()=>{history.push("/pokemons/tipo/13")}} className={"electrico"}>Electrico</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/9")}}  className={"acero"}>Acero</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/12")}}  className={"planta"}>Planta</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/7")}}  className={"insecto"}>Insecto</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/11")}}  className={"agua"}>Agua</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/10")}}  className={"fuego"}>Fuego</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/16")}}  className={"dragon"}>Dragon</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/18")}}  className={"hada"}>Hada</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/2")}}  className={"lucha"}>Lucha</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/17")}}  className={"siniestro"}>Siniestro</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/4")}}  className={"psiquico"}>Psiquico</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/1")}} className={"normal"}>Normal</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/15")}}  className={"hielo"}>Hielo</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/5")}}  className={"tierra"}>Tierra</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/6")}}  className={"roca"}>Roca</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/8")}}  className={"fantasma"}>Fantasma</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/3")}}  className={"volador"}>Volador</button>
                    <button onClick={()=>{history.push("/pokemons/tipo/4")}} className={"veneno"}>Veneno</button>
                </div>
            </div>

        </div>
    );
});

   

