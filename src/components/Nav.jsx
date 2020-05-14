import React from 'react';
import {withRouter} from "react-router-dom";

 
export const Nav=withRouter( (props)=>{
    const {history} =props;
    


    const irInicio = ()=>{
        history.push("/");

    }
    const irPokemons=()=>{
        history.push("/pokemons");


    }
    const mostrarMenuTipo=()=>{
       let menuTipo=document.getElementById("MenuTipo");
        menuTipo.style.display="block";

    }
    
    return(

        <nav>
            <ul>
                
                <li>
                    <button onClick={irInicio}>Inicio</button>
                </li>
                <li>
                    <button onClick={irPokemons}>ver Pokemons</button>
                </li>
                <li>
                    <button onClick={mostrarMenuTipo}>filtrar por tipo</button>
                </li>
            </ul>
        </nav>

    )
});