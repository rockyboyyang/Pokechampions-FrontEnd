import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import Home from "./components/views/Home";
import Pokedex from "./components/views/Pokedex";
import TrainerBio from "./components/views/TrainerBio";
import Battle from "./components/views/Battle";
import SelectTeam from "./components/views/SelectTeam";
import EditPokemonInfo from "./components/views/EditPokemonInfo";
import { AppContext } from './context/AppContext'

const App = props => {
  const backendUrl = "http://localhost:5000"
  const [tokenState, setToken] = useState(localStorage.access_token);
  const [user, setUser] = useState(localStorage.user)
  const [pokemonList, setPokemonList] = useState([])
  const [shinySpritesApi, setShinySpritesList] = useState('https://play.pokemonshowdown.com/sprites/ani-shiny/')
  const [spritesApi, setSpritesList] = useState('https://play.pokemonshowdown.com/sprites/ani/')
  const [listOfPokemonDetails, setListOfPokemonDetails] = useState({})

  // Capitalize first letter of string
  const capFirstLetter = (word) => {
    let capLetter = word.slice(0, 1)
    return capLetter.toUpperCase() + word.slice(1)
  }

  // Grabs a list of Pokemon
  const fetchPokemonNames = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');

    const { results } = await res.json();
    fetchPokemonSprites(results)
    // results[31].name = 'nidoranm'
    // results[28].name = 'nidoranf'
    // results[121].name = 'mrmime'
    setPokemonList(results)
  }

  const fetchPokemonSprites = async (pokemonList) => {
    let pokemonInfo = {};

    let i = 0;
    while(i < pokemonList.length) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonList[i].name}`);
      const results = await res.json()
      if (pokemonList[i].name === 'nidoran-m') pokemonList[i].name = 'nidoranm'
      if (pokemonList[i].name === 'mr-mime') pokemonList[i].name = 'mrmime'
      if (pokemonList[i].name === 'nidoran-f') pokemonList[i].name = 'nidoranf'
      // pokemonList[28].name = 'nidoranf'
      // pokemonList[121].name = 'mrmime'
      // const realSprites = results.sprites.versions['generation-vii']['ultra-sun-ultra-moon']
      pokemonInfo[pokemonList[i].name] = results
      i++
    }
    setListOfPokemonDetails(pokemonInfo)
  }
  
  useEffect(() => {
    fetchPokemonNames();
  }, [])

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ backendUrl, setToken, setUser, user, pokemonList, spritesApi, listOfPokemonDetails, capFirstLetter }}>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/trainers" component={TrainerBio} />
          <Route path="/battle" component={Battle} />
          <Route path="/selectteam" component={SelectTeam} />
          <Route path="/select/:pokemonName" render={(props) => <EditPokemonInfo  {...props} pokemonName={props.match.params.pokemonName} />} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App;
