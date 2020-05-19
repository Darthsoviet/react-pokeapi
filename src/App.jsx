import React, { useState, useRef } from 'react';
import { Route, Switch } from "react-router-dom";
import "./css/styles.css";
import { Nav } from "./components/Nav";
import { Inicio } from "./components/Inicio";
import { Pokemons } from "./components/Pokemons";
import { MenuTipo } from "./components/MenuTipo";
import { TipoPokemon } from "./components/TipoPokemon";
import { Pokemon } from "./components/Pokemon";
import { EncuentroAleatorio } from "./components/EncuentroAleatorio";
import {Iniciacion} from "./components/Iniciacion";
import {PokemonesUsuario} from "./components/PokemonesUsuario";
import { Bautizo} from "./components/Bautizo";





function App() {
  const [ultimo, setultimo] = useState("https://pokeapi.co/api/v2/pokemon");
  const dataList = useRef(new Map());
  
  const [userPokemons, setUserPokemons] = useState(localStorage.getItem("userPokemons")||[]);
  const [equipoActual, setEquipoActual] = useState(localStorage.getItem("equipoActual")||[]);
  const [pokemonCapturado, setPokemonCapturado] = useState(null);

  return (
    <>
      <MenuTipo />
      <Nav userPokemons={userPokemons}/>

      <Switch>
        <Route exact path="/" render={() => <Inicio />} />
        <Route exact path="/pokemons" render={() => <Pokemons dataList={dataList}  setultimo={setultimo} ultimo={ultimo} />} />
        <Route exact path="/pokemons/tipo/:tipo" render={() => <TipoPokemon dataList={dataList} />} />
        <Route exact path="/pokemon/:id" render={() => <Pokemon dataList={dataList} />} />
        <Route exact path="/encuentroAleatorio" render={() => <EncuentroAleatorio datalist={dataList}
        userPokemons={userPokemons} setUserPokemons={setUserPokemons} equipoActual={equipoActual} setEquipoActual={setEquipoActual}/>} />
        <Route exact path="/iniciacion" render={()=><Iniciacion dataList={dataList} userPokemons={userPokemons} setUserPokemons={setUserPokemons}
         setPokemonCapturado={setPokemonCapturado}
        />}/>
        <Route exact path="/misPokemons" render={()=><PokemonesUsuario userPokemons={userPokemons} setUserPokemons={setUserPokemons} equipoActual={equipoActual} setEquipoActual={setEquipoActual}/>}/>
        <Route exact path="/bautizo" render={()=><Bautizo pokemonCapturado={pokemonCapturado} setPokemonCapturado={setPokemonCapturado} userPokemons={userPokemons} setUserPokemons={setUserPokemons} dataList={dataList}/>}/>



      </Switch>

    </>
  );
}

export default App;
