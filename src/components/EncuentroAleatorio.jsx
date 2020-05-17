import React, { useState ,useEffect} from "react";
import { PokemonCard } from "./PokemonCard";


export const EncuentroAleatorio = (props) => {
    const urlBase="https://pokeapi.co/api/v2/pokemon/";
    const [urlPokemon, setUrlPokemon] = useState(urlBase);
    const { dataList, setDataList } = props;
    const [shiny, setShiny] = useState(false);


    const tirarDado = () => {

        let numeroPokedex = Math.random() * 807;
        let suerteShiny = Math.random() * 100;
        if (suerteShiny <=5) {
            setShiny(true);
        }
        let pokedex=Math.round(numeroPokedex);
        setUrlPokemon(urlBase+pokedex+"/");
        return pokedex

    }

   
  
    const capturarPokemon =()=>{
        alert("capturado");
    }

    const colorShiny=()=>{
        if(shiny){
            return" 2px solid gold";
        }else{
            return "none";
        }
    }

    const positionChangeX=()=>{
        let aux = Math.random()*80;
        let poken = document.getElementById("poke");
        
        if(poken){
        poken.style.right=aux+"%";
        }
        return  aux;


    }
    const positionChangeY=()=>{
        let aux = Math.abs((Math.random()*100)-20);
        let poken = document.getElementById("poke");
        
        if(poken){
        poken.style.top=aux+"%";
        }
        return  aux;


    }
    
    useEffect(() => {
        setInterval(positionChangeX,1000);
        setInterval(positionChangeY,1000);


        
        return () => {
            
        };
    }, []);
   
    return (


        

        <main>
            <div className="escenario">
                <div className="interno">
                    <div id="poke" className="contenedor" onClick={capturarPokemon}
                    style={{
                        border:colorShiny(),
                        right:positionChangeX()+"%",
                        top:positionChangeY()+"%"
                    }}
                    >
                    <PokemonCard dataList={dataList} setDataList={setDataList} url={urlPokemon===urlBase?tirarDado():urlPokemon} shiny={shiny}/>

                    </div>
                </div>
            </div>
        </main>

    );

}//fin del componente