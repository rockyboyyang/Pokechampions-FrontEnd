import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import Home from "./components/views/Home";
import Pokedex from "./components/views/Pokedex";
import TrainerBio from "./components/views/TrainerBio";
import BattleSelectView from "./components/views/BattleSelectView";
import BattleSelectEliteFourView from "./components/views/BattleSelectEliteFourView";
import BattleTrainerView from "./components/views/BattleTrainerView";
import SelectTeam from "./components/views/SelectTeam";
import EditPokemonInfo from "./components/views/EditPokemonInfo";
import EditExistingPokemonInfo from "./components/views/EditExistingPokemonInfo";
import { AppContext } from './context/AppContext'

const App = props => {
  const backendUrl = "http://localhost:5000"
  const [tokenState, setToken] = useState(localStorage.access_token);
  const [user, setUser] = useState('')
  const [user_slot_1, setUser_slot_1] = useState('')
  const [user_slot_2, setUser_slot_2] = useState('')
  const [user_slot_3, setUser_slot_3] = useState('')
  const [user_slot_4, setUser_slot_4] = useState('')
  const [user_slot_5, setUser_slot_5] = useState('')
  const [user_slot_6, setUser_slot_6] = useState('')
  const [current_slot, setCurrentSlot] = useState('')
  const [pokemonList, setPokemonList] = useState([])
  const [shinySpritesApi, setShinySpritesList] = useState('https://play.pokemonshowdown.com/sprites/ani-shiny/')
  const [spritesApi, setSpritesList] = useState('https://play.pokemonshowdown.com/sprites/ani/')
  const [back_spritesApi, seBack_SpritesList] = useState('https://play.pokemonshowdown.com/sprites/ani-back/')
  const [listOfPokemonDetails, setListOfPokemonDetails] = useState({})
  const [selectedMove, setSelectedMove] = useState('')
  const [opponent, setOpponent] = useState('')

  const checkUserExist = () => {
    try{
      console.log('asd')
      setUser(JSON.parse(localStorage.user))
      setUser_slot_1(JSON.parse(user.slot_1))
      setUser_slot_2(JSON.parse(user.slot_2))
      setUser_slot_3(JSON.parse(user.slot_3))
      setUser_slot_4(JSON.parse(user.slot_4))
      setUser_slot_5(JSON.parse(user.slot_5))
      setUser_slot_6(JSON.parse(user.slot_6))
    }
    catch(e) {
      console.log(e)
    }
  }

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

  // fix Effect Text
  const fixEffectText = (text, chance) => {
    let indexOfChar = text.indexOf('$')
    let firstHalfStr = text.slice(0, indexOfChar)
    let secondHalfStr = text.slice(text.indexOf('%'))
    return firstHalfStr + JSON.stringify(chance) + secondHalfStr
  }

  // Grabs the information about move selected
  const fetchMoveInfo = async (e) => {
    console.log(e.target.id)
    const res = await fetch(`https://pokeapi.co/api/v2/move/${e.target.id}/`);

    const results = await res.json();
    const moveDetails = {}
    moveDetails.name = results.name
    moveDetails.power = results.power
    moveDetails.pp = results.pp
    moveDetails.accuracy = results.accuracy
    moveDetails.damage_class = results.damage_class.name
    moveDetails.type = results.type.name
    moveDetails.stat_changes = results.stat_changes
    moveDetails.priority = results.priority
    moveDetails.effect_chance = results.effect_chance
    moveDetails.effect = fixEffectText(results.effect_entries[0].effect, results.effect_chance)
    setSelectedMove(moveDetails)
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
    setSelectedMove('')
    fetchPokemonNames();
    if (tokenState) {
      checkUserExist();
    }
  }, [])

  // if(!user) return <h1>Loading</h1>
  
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ backendUrl,
                                    capFirstLetter, 
                                    setToken, 
                                    setUser, 
                                    user, 
                                    pokemonList,
                                    spritesApi, 
                                    listOfPokemonDetails, 
                                    capFirstLetter, 
                                    fetchMoveInfo, 
                                    selectedMove,
                                    user_slot_1, 
                                    user_slot_2, 
                                    user_slot_3, 
                                    user_slot_4, 
                                    user_slot_5, 
                                    user_slot_6, 
                                    setUser_slot_2, 
                                    setUser_slot_3, 
                                    setUser_slot_4, 
                                    setUser_slot_5, 
                                    setUser_slot_6, 
                                    setUser_slot_1,
                                    setCurrentSlot,
                                    current_slot,
                                    setSelectedMove,
                                    setOpponent,
                                    opponent,
                                    back_spritesApi }
                                    }>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/trainers" component={TrainerBio} />
          <Route path="/battle/gymleaders" component={BattleSelectView} />
          <Route path="/battle/elitefour" component={BattleSelectEliteFourView} />
          <Route path="/challenge/:trainer" render={(props) => <BattleTrainerView {...props} trainer={props.match.params.trainer} />} />
          <Route path="/selectteam" component={SelectTeam} />
          <Route path="/select/:pokemonName" render={(props) => <EditPokemonInfo  {...props} pokemonName={props.match.params.pokemonName} />} />
          <Route path="/select-existing/:pokemonName" render={(props) => <EditExistingPokemonInfo  {...props} pokemonName={props.match.params.pokemonName} />} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App;
