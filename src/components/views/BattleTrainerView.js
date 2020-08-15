import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const BattleTrainerView = () => {
    const { setSelectedMove, spritesApi, back_spritesApi, user, opponent, capFirstLetter } = useContext(AppContext)
    let history = useHistory()
    const [readyForBattle, setReadyForBattle] = useState(false)
    const [userCurrentPokemon, setUserCurrentPokemon] = useState(user)
    const [userSlot_2Pokemon, setUserSlot_2CurrentPokemon] = useState('')
    const [userSlot_3Pokemon, setUserSlot_3CurrentPokemon] = useState('')
    const [userSlot_4Pokemon, setUserSlot_4CurrentPokemon] = useState('')
    const [userSlot_5Pokemon, setUserSlot_5CurrentPokemon] = useState('')
    const [userSlot_6Pokemon, setUserSlot_6CurrentPokemon] = useState('')
    const [opponentCurrentPokemon, setOpponentCurrentPokemon] = useState('')
    const [opponentSlot_1Pokemon, setOpponentSlot_1CurrentPokemon] = useState('')
    const [opponentSlot_2Pokemon, setOpponentSlot_2CurrentPokemon] = useState('')
    const [opponentSlot_3Pokemon, setOpponentSlot_3CurrentPokemon] = useState('')
    const [opponentSlot_4Pokemon, setOpponentSlot_4CurrentPokemon] = useState('')
    const [opponentSlot_5Pokemon, setOpponentSlot_5CurrentPokemon] = useState('')
    const [opponentSlot_6Pokemon, setOpponentSlot_6CurrentPokemon] = useState('')

    const routeToBattleSelectScreen = () => {
        history.push('./battle/gymleaders')
    }

    const routeToTeamSelectScreen = () => {
        history.push('./selectteam')
    }

    const getRandomFloat = (min, max) => {
        return JSON.parse((Math.random() * (max - min) + min).toFixed(2));
    }

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const fetchTypeEffectiveness = async (type) => {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        let result = await res.json()
        return result
    }

    // const attack = () => {
    //     let random = getRandomFloat(0.85, 1)
    //     let critical = isCritical();
    //     let weather = 1;
    //     let stab = 1;
    //     let burn = 1;
    //     let targetType1;
    //     let targetType2;
    // }

    const isCritical = () => {
        if (randomIntFromInterval(1, 24) === 12) return 1.5
        else return 1
    }

    const clickToBattle = (e) => {
        e.preventDefault()
        setUserCurrentPokemon(JSON.parse(user.slot_1))
        setOpponentCurrentPokemon(JSON.parse(opponent.slot_1))
        setReadyForBattle(true)
    }
    useEffect(() => {
        setSelectedMove('')
    }, [])

    const attack = async (e) => {
        e.preventDefault()
        let moveSelectedType;
        if (e.target.id === 'slot_1') moveSelectedType = userCurrentPokemon.moveSlot_1.type;
        if (e.target.id === 'slot_2') moveSelectedType = userCurrentPokemon.moveSlot_2.type;
        if (e.target.id === 'slot_3') moveSelectedType = userCurrentPokemon.moveSlot_3.type;
        if (e.target.id === 'slot_4') moveSelectedType = userCurrentPokemon.moveSlot_4.type;
        
        // grab selectedMove info
        const res = await fetch(`https://pokeapi.co/api/v2/type/${moveSelectedType}`)
        let result = await res.json()
        let doubleDamageTo = result.damage_relations.double_damage_to
        let halfDamageTo = result.damage_relations.half_damage_to
        let noDamageTo = result.damage_relations.no_damage_to
        let opponentCurrentPokemonType = opponentCurrentPokemon.pokemonType
        // weather
        let stab = 1
        let targetType1 = 1
        let targetType2 = 1
        let burn = 1
        let critical = isCritical()
        let random = getRandomFloat(0.85, 1)

        // checks for stab
        for(let i = 0; i < userCurrentPokemon.pokemonType.length; i++) {
            if(userCurrentPokemon.pokemonType[i].type.name === moveSelectedType) stab = 1.5
        }

        // checks to see if move is super effective
        for(let i = 0; i < doubleDamageTo.length; i++) {
            if (doubleDamageTo[i].name === opponentCurrentPokemonType[0].type.name) targetType1 = 2
            if (opponentCurrentPokemonType[1]) {
                if (doubleDamageTo[i].name === opponentCurrentPokemonType[1].type.name) targetType2 = 2
            }
        }

        // checks to see if move is not very effective
        for (let i = 0; i < halfDamageTo.length; i++) {
            if (halfDamageTo[i].name === opponentCurrentPokemonType[0].type.name) targetType1 = 0.5
            if (opponentCurrentPokemonType[1]) {
                if (halfDamageTo[i].name === opponentCurrentPokemonType[1].type.name) targetType2 = 0.5
            }
        }  

        // checks to see if move has no effect
        // if(noDamageTo) {
        //     if (noDamageTo[0].name === opponentCurrentPokemonType[0].type.name) targetType1 = 0
        //     if (userCurrentPokemon.pokemonType.length = 2) {
        //         if (noDamageTo[0].name === opponentCurrentPokemonType[1].type.name) targetType2 = 0
        //     }
        // }

        // checks if burn

        // checks if weather condition


        console.log(result)
        console.log({
            'stab': stab,
            'type1': targetType1,
            'type2':targetType2
        })
        // include weather later
        let modifier = critical * random * stab * burn * targetType1 * targetType2
        console.log(modifier)
    }
    if(readyForBattle) {
        return (
            <div className="view-body">
                <Navbar />
                <div className="center-body">
                    <div className="left-box battle-box">
                        <div className="battle-screen-container">
                            <div className="battle-screen">
                                <div className="user-current-pokemon battling-pokemon"><img src={`${back_spritesApi}${userCurrentPokemon.pokemon}.gif`}></img></div>
                                <div className="opponent-current-pokemon battling-pokemon"><img src={`${spritesApi}${opponentCurrentPokemon.pokemon}.gif`}></img></div>
                                <div className="user-pokemon-status-info status-info-container">
                                    <div className="status-info-name"><p>{capFirstLetter(userCurrentPokemon.pokemon)}  Lv50</p></div>
                                    <div className="status-info-hpbar">
                                        <div className="user-hpbar-container hpbar-container">
                                            <div className="user-hpbar hpbar"></div>
                                        </div>
                                        <p className="userhp-percentage hp-percentage">100%</p>
                                    </div>
                                    <div className="status-info-effect"></div>
                                </div>
                                <div className="opponent-pokemon-status-info status-info-container">
                                    <div className="status-info-name"><p>{capFirstLetter(opponentCurrentPokemon.pokemon)}  Lv50</p></div>
                                    <div className="status-info-hpbar">
                                        <div className="opponent-hpbar-container hpbar-container">
                                            <div className="opponent-hpbar hpbar"></div>
                                        </div>
                                        <p className="opponenthp-percentage hp-percentage">100%</p>
                                    </div>
                                    <div className="status-info-effect"></div>
                                </div>
                            </div>
                        </div>
                        <div className="move-slots-container-battle">
                            <button className="move-slot" id="slot_1" onClick={attack}>{userCurrentPokemon.moveSlot_1.name}</button>
                            <button className="move-slot" id="slot_2" onClick={attack}>{userCurrentPokemon.moveSlot_2.name}</button>
                            <button className="move-slot" id="slot_3" onClick={attack}>{userCurrentPokemon.moveSlot_3.name}</button>
                            <button className="move-slot" id="slot_4" onClick={attack}>{userCurrentPokemon.moveSlot_4.name}</button>
                        </div>
                    </div>
                    <div className="right-box"></div>
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <>
                <h1>Are You Ready To Battle?</h1>
                <button onClick={clickToBattle}>Click to Battle</button>
            </>
        )
    }
}

export default BattleTrainerView;
