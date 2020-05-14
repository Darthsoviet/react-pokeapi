import React from 'react';
import { Route, Switch } from "react-router-dom";
import "./css/styles.css";
import { Nav } from "./components/Nav";
import { Inicio } from "./components/Inicio";
import { Pokemons } from "./components/Pokemons";
import { MenuTipo } from "./components/MenuTipo";
import {TipoPokemon} from "./components/TipoPokemon";

function App() {
  return (
    <>
      <MenuTipo />
      <Nav />

      <Switch>
        <Route exact path="/" component={Inicio}  />
        <Route exact path="/pokemons" component={Pokemons} />
        <Route exact path="/pokemons/tipo/:tipo"  component={TipoPokemon}/>
      </Switch>

    </>
  );
}

export default App;
