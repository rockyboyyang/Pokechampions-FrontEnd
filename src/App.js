import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import Home from "./components/views/Home";
import Pokedex from "./components/views/Pokedex";
import TrainerBio from "./components/views/TrainerBio";
import Battle from "./components/views/Battle";
import SelectTeam from "./components/views/SelectTeam";
import { AppContext } from './context/AppContext'

const App = props => {
  const backendUrl = "http://localhost:5000"
  const [tokenState, setToken] = useState(localStorage.access_token);
  const [user, setUser] = useState(localStorage.user)
  const [pokemonList, setPokemonList] = useState([])
  const [spritesList, setSpritesList] = useState({})
  // Grabs a list of Pokemon
  const fetchPokemonNames = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');

    const { results } = await res.json();
    setPokemonList(results)
    fetchPokemonSprites(results)
  }

  const fetchPokemonSprites = async (pokemonList) => {
    let sprites = {}

    let i = 0;
    while(i < pokemonList.length) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonList[i].name}`);
      const results = await res.json()
      const realSprites = results.sprites.versions['generation-vii']['ultra-sun-ultra-moon']
      sprites[pokemonList[i].name] = realSprites
      i++
    }
    setSpritesList(sprites)
  }
  
  useEffect(() => {
    fetchPokemonNames();
  }, [])

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ backendUrl, setToken, setUser, user, pokemonList, spritesList }}>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/trainers" component={TrainerBio} />
          <Route path="/battle" component={Battle} />
          <Route path="/selectteam" component={SelectTeam} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App;
