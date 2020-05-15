import React,{useState} from 'react';
import { Route, Switch } from "react-router-dom";
import "./css/styles.css";
import { Nav } from "./components/Nav";
import { Inicio } from "./components/Inicio";
import { Pokemons } from "./components/Pokemons";
import { MenuTipo } from "./components/MenuTipo";
import {TipoPokemon} from "./components/TipoPokemon";
import {Pokemon} from "./components/Pokemon";


function App() {
  const [ultimo, setultimo] = useState("https://pokeapi.co/api/v2/pokemon");
  return (
    <>
     <MenuTipo />
      <Nav />
      
      <Switch>
        <Route exact path="/" render={()=><Inicio/>}  />
        <Route exact path="/pokemons" render={ ()=> <Pokemons setultimo={setultimo} ultimo={ultimo}/>} />
        <Route exact path="/pokemons/tipo/:tipo"  render={()=><TipoPokemon/>}/>
        <Route exact path="/pokemon/:id" render={()=><Pokemon/>}/>

      </Switch>

    </>
  );
}

export default App;
