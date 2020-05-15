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
  const [dataList,setDataList] = useState(new Map())
  return (
    <>
     <MenuTipo />
      <Nav />
      
      <Switch>
        <Route exact path="/" render={()=><Inicio/>}  />
        <Route exact path="/pokemons" render={ ()=> <Pokemons dataList={dataList} setDataList={setDataList} setultimo={setultimo} ultimo={ultimo}/>} />
        <Route exact path="/pokemons/tipo/:tipo"  render={()=><TipoPokemon dataList={dataList}  />}/>
        <Route exact path="/pokemon/:id" render={()=><Pokemon dataList={dataList}/>}/>

      </Switch>

    </>
  );
}

export default App;
