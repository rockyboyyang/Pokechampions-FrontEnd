import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import Home from "./components/views/Home";
import Pokedex from "./components/views/Pokedex";
import ViewPokemonInfo from "./components/views/ViewPokemonInfo";
import SelectTrainerBio from "./components/views/SelectTrainerBio";
import SelectEliteFourBio from "./components/views/SelectEliteFourBio";
import SelectChampionBio from "./components/views/SelectChampionBio";
import BattleSelectView from "./components/views/BattleSelectView";
import BattleSelectEliteFourView from "./components/views/BattleSelectEliteFourView";
import BattleSelectChampionView from "./components/views/BattleSelectChampionView";
import BattleTrainerView from "./components/views/BattleTrainerView";
import SelectTeam from "./components/views/SelectTeam";
import EditPokemonInfo from "./components/views/EditPokemonInfo";
import EditExistingPokemonInfo from "./components/views/EditExistingPokemonInfo";
import ViewBio from "./components/views/ViewBio";
import { AppContext } from './context/AppContext'


const App = props => {
  const backendUrl = "https://infinite-everglades-82990.herokuapp.com"
  // const backendUrl = "http://localhost:5000"
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
  const [back_spritesApi, setBack_SpritesList] = useState('https://play.pokemonshowdown.com/sprites/ani-back/')
  const [shinyBack_spritesApi, setShinyBack_SpritesList] = useState('https://play.pokemonshowdown.com/sprites/ani-back-shiny/')
  const [listOfPokemonDetails, setListOfPokemonDetails] = useState({})
  const [selectedMove, setSelectedMove] = useState('')
  const [opponent, setOpponent] = useState('')
  const [battleSequence, setBattleSequence] = useState(false)

  let history = useHistory();
  const checkUserExist = () => {
    try{
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

  // Capitalize first letter of string or first letter of two words if string has two words
  const capFirstLetter = (word) => {
    if(!word) return;
    if (word === 'nidoranf') return 'Nidoran ♀'
    if (word === 'nidoranm') return 'Nidoran ♂'
    if (word === 'mrmime') return 'Mr. Mime'
    if (word === 'ltsurge') return 'Lt. Surge'
    if (word === 'x-scissor') return 'X-Scissor'
    if (word === 'mime-jr') return 'Mime Jr.'
    if (word === 'ho-oh') return 'hooh'
    if (word === 'deoxys-normal') return 'Deoxys'
    if (word === 'wormadam-plant') return 'Wormadam'
    if (word === 'giratina-altered') return 'Giratina'
    if (word === 'darmanitan-standard') return 'Darmanitan'
    if (word === 'landorus-incarnate') return 'Landorus'
    if (word === 'tornadus-incarnate') return 'Tornadus'
    if (word === 'meloetta-aria') return 'Meloetta'
    if (word === 'thundurus-incarnate') return 'Thundurus'
    if (word === 'shaymin-land') return 'Shaymin'
    if (word === 'keldeo-ordinary') return 'Keldeo'
    if (word === 'basculin-red-striped') return 'Basculin'
    if (word === 'meowstic-male') return 'Meowstic'
    if (word === 'aegislash-shield') return 'Aegislash'
    if (word === 'gourgeist-average') return 'Gourgeist'
    if (word === 'pumpkaboo-average') return 'Pumpkaboo'
    if (word === 'oricorio-baile') return 'Oricorio'
    if (word === 'wishiwashi-solo') return 'Wishiwashi'
    if (word === 'lycanroc-midday') return 'Lycanroc'
    if (word === 'mimikyu-disguised') return 'Mimikyu'
    if (word === 'kommo-o') return 'Kommo-O'
    if (word === 'jangmo-o') return 'Jangmo-O'
    if (word === 'hakamo-o') return 'Hakamo-O'
    // if (word === 'tapu-koko') return 'tapukoko'
    // if (word === 'tapu-lele') return 'tapulele'
    // if (word === 'tapu-bulu') return 'tapubulu'
    // if (word === 'tapu-fini') return 'tapufini'
    if (word === 'sirfetch') return 'Sirfetch\'d'
    if (word === 'mr') return 'mrrime'
    if (word === 'minior-red-meteor') return 'Minior'
    if (word === 'type-null') return 'Type: Null'
    if (word.includes('-')) {
      let strArr = word.split('-')
      let newArrCap = []
      for(let i = 0; i < strArr.length; i++) {
        let capLetter = strArr[i].slice(0, 1)
        newArrCap.push(capLetter.toUpperCase() + strArr[i].slice(1))
      }
      if(newArrCap[newArrCap.length - 1] === 'Alola') {
        newArrCap.pop()
        newArrCap.push('(Alolan)')
      }
      return newArrCap.join(' ')
    }
    let capLetter = word.slice(0, 1)
    return capLetter.toUpperCase() + word.slice(1)
  }
  
  // Grabs a list of Pokemon
  const fetchPokemonNames = async () => {
    // ALL POKEMON
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=807&offset=0');

    // FIRST 151
    // const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
    
    const { results } = await res.json();
    fetchPokemonSprites(results)
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
    e.preventDefault()
    const res = await fetch(`https://pokeapi.co/api/v2/move/${e.target.id}/`);

    const results = await res.json();
    const moveDetails = {}
    moveDetails.name = results.name
    moveDetails.power = results.power
    moveDetails.pp = results.pp
    moveDetails.accuracy = results.accuracy
    moveDetails.damage_class = results.damage_class.name
    moveDetails.type = results.type.name
    moveDetails.typeURL = results.type.url
    moveDetails.stat_changes = results.stat_changes
    moveDetails.priority = results.priority
    moveDetails.effect_chance = results.effect_chance
    moveDetails.effect = fixEffectText(results.effect_entries[0].effect, results.effect_chance)
    setSelectedMove(moveDetails)
  }

  const fetchPokemonSprites = async (pokemonList) => {
    let pokemonInfo = {};

    const mergeSort = async(array) => {
      if (array.length === 1) {
        let res;

        try {
          res = await fetch(`https://pokeapi.co/api/v2/pokemon/${array[0].name}`);
        } catch (e) {

        }

        if(res.ok) {
          const results = await res.json()
          try {
            pokemonInfo[array[0].name] = results
          } catch(e) {
          }
          return pokemonInfo;
        }
      }

      if(array.length === 0) return

      let midIdx = Math.floor(array.length / 2);
      let leftHalf = array.slice(0, midIdx);
      let rightHalf = array.slice(midIdx);

      mergeSort(leftHalf);
      mergeSort(rightHalf);

      // return pokemonInfo
    }
    // let i = 0;

    // while(i < pokemonList.length) {
    //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonList[i].name}`);
    //   const results = await res.json()
    //   if (pokemonList[i].name === 'nidoran-m') pokemonList[i].name = 'nidoranm'
    //   if (pokemonList[i].name === 'mr-mime') pokemonList[i].name = 'mrmime'
    //   if (pokemonList[i].name === 'nidoran-f') pokemonList[i].name = 'nidoranf'
    //   // pokemonList[28].name = 'nidoranf'
    //   // pokemonList[121].name = 'mrmime'
    //   // const realSprites = results.sprites.versions['generation-vii']['ultra-sun-ultra-moon']
    //   pokemonInfo[pokemonList[i].name] = results
    //   console.log(results)
    //   i++
    // }
    mergeSort(pokemonList).then(setListOfPokemonDetails(pokemonInfo))
    // console.log(mergeSort(pokemonList, pokemonInfo).then((res) => res))
    // setListOfPokemonDetails(pokemonList)
  }
  
  // Adjusts name so we can grab sprites
  const adjustName = (pokemon) => {
    if (pokemon === 'ho-oh') return 'hooh'
    if (pokemon === 'mime-jr') return 'mimejr'
    if (pokemon === 'deoxys-normal') return 'deoxys'
    if (pokemon === 'wormadam-plant') return 'wormadam'
    if (pokemon === 'giratina-altered') return 'giratina'
    if (pokemon === 'darmanitan-standard') return 'darmanitan'
    if (pokemon === 'mr-mime') return 'mrmime'
    if (pokemon === 'nidoran-m') return 'nidoranm'
    if (pokemon === 'landorus-incarnate') return 'landorus'
    if (pokemon === 'tornadus-incarnate') return 'tornadus'
    if (pokemon === 'meloetta-aria') return 'meloetta'
    if (pokemon === 'thundurus-incarnate') return 'thundurus'
    if (pokemon === 'shaymin-land') return 'shaymin'
    if (pokemon === 'keldeo-ordinary') return 'keldeo'
    if (pokemon === 'basculin-red-striped') return 'basculin'
    if (pokemon === 'meowstic-male') return 'meowstic'
    if (pokemon === 'aegislash-shield') return 'aegislash'
    if (pokemon === 'gourgeist-average') return 'gourgeist'
    if (pokemon === 'pumpkaboo-average') return 'pumpkaboo'
    if (pokemon === 'oricorio-baile') return 'oricorio'
    if (pokemon === 'wishiwashi-solo') return 'wishiwashi'
    if (pokemon === 'lycanroc-midday') return 'lycanroc'
    if (pokemon === 'mimikyu-disguised') return 'mimikyu'
    if (pokemon === 'kommo-o') return 'kommoo'
    if (pokemon === 'jangmo-o') return 'jangmoo'
    if (pokemon === 'hakamo-o') return 'hakamoo'
    if (pokemon === 'tapu-koko') return 'tapukoko'
    if (pokemon === 'tapu-lele') return 'tapulele'
    if (pokemon === 'tapu-bulu') return 'tapubulu'
    if (pokemon === 'tapu-fini') return 'tapufini'
    if (pokemon === 'sirfetch') return 'sirfetchd'
    if (pokemon === 'mr') return 'mrrime'
    if (pokemon === 'minior-red-meteor') return 'minior'
    if (pokemon === 'type-null') return 'typenull'


    return pokemon
  }

  useEffect(() => {
    setSelectedMove('')
    fetchPokemonNames();
    if (tokenState) {
      checkUserExist();
    }
  }, [])

  // if(!user) return <h1>Loading</h1>

  // Check to see if you can battle selected trainer
  const checkForAbilityToChallenge = (trainer) => {
    if (trainer === 'misty' && !user.boulderbadge) {
      alert('You have not received the Boulderbadge yet!')
      return false
    }

    if (trainer === 'ltsurge' && !user.cascadebadge) {
      alert('You have not received the Cascadebadge yet!')
      return false
    }

    if (trainer === 'erika' && !user.thunderbadge) {
      alert('You have not received the Thunderbadge yet!')
      return false
    }

    if (trainer === 'koga' && !user.rainbowbadge) {
      alert('You have not received the Rainbowbadge yet!')
      return false
    }

    if (trainer === 'sabrina' && !user.soulbadge) {
      alert('You have not received the Soulbadge yet!')
      return false
    }

    if (trainer === 'blaine' && !user.marshbadge) {
      alert('You have not received the Marshbadge yet!')
      return false
    }

    if (trainer === 'giovanni' && !user.volcanobadge) {
      alert('You have not received the Volcanobadge yet!')
      return false
    }

    if (trainer === 'bruno' && !user.beatElite4_1) {
      alert('You have not defeated Lorelei yet!')
      return false
    }

    if (trainer === 'agatha' && !user.beatElite4_2) {
      alert('You have not defeated Bruno yet!')
      return false
    }

    if (trainer === 'lance' && !user.beatElite4_3) {
      alert('You have not defeated Agatha yet!')
      return false
    }
    return true
  }

  const checkForAbilityToViewBio = (trainer) => {
    if (trainer === 'brock' && !user.boulderbadge) {
      alert('You have not received the Boulderbadge yet!')
      return false
    }

    if (trainer === 'misty' && !user.cascadebadge) {
      alert('You have not received the Cascadebadge yet!')
      return false
    }

    if (trainer === 'ltsurge' && !user.thunderbadge) {
      alert('You have not received the Thunderbadge yet!')
      return false
    }

    if (trainer === 'erika' && !user.rainbowbadge) {
      alert('You have not received the Rainbowbadge yet!')
      return false
    }

    if (trainer === 'koga' && !user.soulbadge) {
      alert('You have not received the Soulbadge yet!')
      return false
    }

    if (trainer === 'sabrina' && !user.marshbadge) {
      alert('You have not received the Marshbadge yet!')
      return false
    }

    if (trainer === 'blaine' && !user.volcanobadge) {
      alert('You have not received the Volcanobadge yet!')
      return false
    }

    if (trainer === 'giovanni' && !user.earthbadge) {
      alert('You have not received the Earthbadge yet!')
      return false
    }

    if (trainer === 'lorelei' && !user.beatElite4_1) {
      alert('You have not defeated Lorelei yet!')
      return false
    }

    if (trainer === 'bruno' && !user.beatElite4_2) {
      alert('You have not defeated Bruno yet!')
      return false
    }

    if (trainer === 'agatha' && !user.beatElite4_3) {
      alert('You have not defeated Agatha yet!')
      return false
    }

    if (trainer === 'lance' && !user.beatElite4_4) {
      alert('You have not defeated Lance yet!')
      return false
    }

    if (trainer === 'rocky' && !user.beatChampion) {
      alert('You have not defeated Rocky yet!')
      return false
    }

    return true
  }

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
                                    setListOfPokemonDetails,
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
                                    back_spritesApi,
                                    checkForAbilityToChallenge,
                                    checkForAbilityToViewBio,
                                    adjustName,
                                    shinySpritesApi,
                                    shinyBack_spritesApi,
                                    battleSequence,
                                    setBattleSequence }
                                    }>
        <Switch>
          <Route exact path="/" render={(props) => <Redirect to='/home'/>}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/viewpokemon/:pokemonName" render={(props) => <ViewPokemonInfo  {...props} pokemonName={props.match.params.pokemonName} />} />
          <Route path="/viewbio" component={ViewBio} />
          <Route path="/selectbio/gymleaders" component={SelectTrainerBio} />
          <Route path="/selectbio/elitefour" component={SelectEliteFourBio} />
          <Route path="/selectbio/champion" component={SelectChampionBio} />
          <Route path="/battle/gymleaders" component={BattleSelectView} />
          <Route path="/battle/elitefour" component={BattleSelectEliteFourView} />
          <Route path="/battle/champion" component={BattleSelectChampionView} />
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
