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
    const [opponentSlot_2Pokemon, setOpponentSlot_2CurrentPokemon] = useState('')
    const [opponentSlot_3Pokemon, setOpponentSlot_3CurrentPokemon] = useState('')
    const [opponentSlot_4Pokemon, setOpponentSlot_4CurrentPokemon] = useState('')
    const [opponentSlot_5Pokemon, setOpponentSlot_5CurrentPokemon] = useState('')
    const [opponentSlot_6Pokemon, setOpponentSlot_6CurrentPokemon] = useState('')
    const [battleSequence, setBattleSequence] = useState(false)
    const [moveUsed, setMoveUsed] = useState('')
    const [userPokemonStats, setUserPokemonStats] = useState({})
    const [opponentPokemonStats, setOpponentPokemonStats] = useState({})
    const [effective, setEffective] = useState('')
    const [critical, setCritical] = useState('')
    const [statChange, setStatChange] = useState('')
    const [ohko, setOhko] = useState('')


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

    const isCritical = () => {
        if (randomIntFromInterval(1, 24) === 12) return 1.5
        else return 1
    }
    
    const clickToBattle = (e) => {
        e.preventDefault()
        let userPokemon = JSON.parse(user.slot_1)
        let opponentPokemon = JSON.parse(opponent.slot_1)
        setUserCurrentPokemon(userPokemon)
        setOpponentCurrentPokemon(opponentPokemon)
        setUserSlot_2CurrentPokemon(JSON.parse(user.slot_2))
        setUserSlot_3CurrentPokemon(JSON.parse(user.slot_3))
        setUserSlot_4CurrentPokemon(JSON.parse(user.slot_4))
        setUserSlot_5CurrentPokemon(JSON.parse(user.slot_5))
        setUserSlot_6CurrentPokemon(JSON.parse(user.slot_6))
        setOpponentSlot_2CurrentPokemon(JSON.parse(opponent.slot_2))
        setOpponentSlot_3CurrentPokemon(JSON.parse(opponent.slot_3))
        setOpponentSlot_4CurrentPokemon(JSON.parse(opponent.slot_4))
        setOpponentSlot_5CurrentPokemon(JSON.parse(opponent.slot_5))
        setOpponentSlot_6CurrentPokemon(JSON.parse(opponent.slot_6))

        setUserPokemonStats({
            'maxhp': userPokemon.pokemonStats[0].base_stat + 60,
            'remaininghp': userPokemon.pokemonStats[0].base_stat + 60,
            'attack': userPokemon.pokemonStats[1].base_stat + 5,
            'defense': userPokemon.pokemonStats[2].base_stat + 5,
            'special-attack': userPokemon.pokemonStats[3].base_stat + 5,
            'special-defense': userPokemon.pokemonStats[4].base_stat + 5,
            'speed': userPokemon.pokemonStats[5].base_stat + 5,
        })
        setOpponentPokemonStats({
            'maxhp': opponentPokemon.pokemonStats[0].base_stat + 60,
            'remaininghp': userPokemon.pokemonStats[0].base_stat + 60,
            'attack': opponentPokemon.pokemonStats[1].base_stat + 5,
            'defense': opponentPokemon.pokemonStats[2].base_stat + 5,
            'special_attack': opponentPokemon.pokemonStats[3].base_stat + 5,
            'special_defense': opponentPokemon.pokemonStats[4].base_stat + 5,
            'speed': opponentPokemon.pokemonStats[5].base_stat + 5,
        })
        setReadyForBattle(true)
    }
    useEffect(() => {
        setSelectedMove('')
    }, [])

    const attack = async (slot) => {
        // e.preventDefault()

        // TODO: Have to swap userCurrentPokemon and OpponentCurrentPokemon with
        // attacking pokemon and defending pokemon

        let moveSelected;
        if (slot === 'slot_1') moveSelected = userCurrentPokemon.moveSlot_1;
        if (slot === 'slot_2') moveSelected = userCurrentPokemon.moveSlot_2;
        if (slot === 'slot_3') moveSelected = userCurrentPokemon.moveSlot_3;
        if (slot === 'slot_4') moveSelected = userCurrentPokemon.moveSlot_4;
        
        // grab selectedMove info
        const res = await fetch(`https://pokeapi.co/api/v2/type/${moveSelected.type}`)
        let result = await res.json()

        let level = 50;
        let attack;  // attacking pokemon's attack
        let defense; // defending pokemon's defense
        let power = moveSelected.power

        // checks to see which type of move it was
        if (moveSelected.damage_class === "physical") attack = userPokemonStats.attack;
        if (moveSelected.damage_class === "special") attack = userPokemonStats.special_attack;
        if (moveSelected.damage_class === "physical") defense = opponentPokemonStats.attack;
        if (moveSelected.damage_class === "special") defense = opponentPokemonStats.special_attack
        // if (moveSelected.damage_class === )
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
        if(userCurrentPokemon.pokemonType[0].type.name === moveSelected.type) stab = 1.5
        if(userCurrentPokemon.pokemonType[1]) {
            if(userCurrentPokemon.pokemonType[1].type.name === moveSelected.type) stab = 1.5
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
        if(noDamageTo.length > 0) {
            if (noDamageTo[0].name === opponentCurrentPokemonType[0].type.name) targetType1 = 0
            if (opponentCurrentPokemonType[1]) {
                if (noDamageTo[0].name === opponentCurrentPokemonType[1].type.name) targetType2 = 0
            }
        }

        // checks if burn

        // checks if weather condition

        // include weather later
        let modifier = critical * random * stab * burn * targetType1 * targetType2
        let damage = (((((2 * level) / 5) + 2) * power * (attack / defense)) / 50) + 2
        let totalDamage = Math.floor(damage * modifier)
        
        let effective = null;

        if(targetType1 + targetType2 > 2) effective = 'Super Effective'
        else if(targetType1 + targetType1 < 2) effective = 'Not-Very Effective'
        if(targetType1 * targetType2 === 0) effective = 'No Effect'

        console.log({
            'critical': critical,
            'stab': stab,
            'type1': targetType1,
            'type2':targetType2,
            'effective': effective,
            'damage': totalDamage,
        })

        return {
            'move':moveSelected.name,
            'critical': critical,
            'effective': effective,
            'damage': totalDamage,
        }
    }

    const beginBattleSequence = async (e) => {
        e.preventDefault()
        let userMove = e.target.id
        let opponentMove;
        // determine opponent move
        // TODO: For now opponent will do random moves
        let slot = randomIntFromInterval(1, 4);
        if (slot === 1) opponentMove = 'slot_1'
        if (slot === 2) opponentMove = 'slot_2'
        if (slot === 3) opponentMove = 'slot_3'
        if (slot === 4) opponentMove = 'slot_4'
        
        if(userPokemonStats.speed > opponentPokemonStats.speed) {
            let moveUsed = await attack(userMove).then((res) => res)
            let tempOppPokemon = opponentPokemonStats
            tempOppPokemon.remaininghp -= moveUsed.damage
            setEffective(moveUsed.effective)
            setCritical(moveUsed.critical)
            setOpponentPokemonStats(tempOppPokemon)
            let opponentMoveUsed = await attack(opponentMove).then((res) => res)
            let tempUserPokemon = userPokemonStats
            tempUserPokemon.remaininghp -= opponentMoveUsed.damage
            setUserPokemonStats(tempUserPokemon)
        }
        setBattleSequence(true)
        // setMoveUsed(attack(e.target.id))
        // let first = document.getElementById('typewriter-text')
        // dialogue.innerHTML = "<p className='text_1'>Pikachu used Thunder-Punch</p><p className='text_2'>That was super effective</p>"
        // console.log(dialogue)
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
                        {!battleSequence ? (
                            <div className="move-slots-container-battle">
                                <button className="move-slot" id="slot_1" onClick={beginBattleSequence}>{userCurrentPokemon.moveSlot_1.name}</button>
                                <button className="move-slot" id="slot_2" onClick={beginBattleSequence}>{userCurrentPokemon.moveSlot_2.name}</button>
                                <button className="move-slot" id="slot_3" onClick={beginBattleSequence}>{userCurrentPokemon.moveSlot_3.name}</button>
                                <button className="move-slot" id="slot_4" onClick={beginBattleSequence}>{userCurrentPokemon.moveSlot_4.name}</button>
                            </div>
                            ) : (
                                <div className="typewriter">
                                    <h1 id='typewriter-text'>
                                        <p id="text_1">{userCurrentPokemon.pokemon} used {moveUsed}</p>
                                        {effective ? (
                                            <p id="text_1">It's {effective}!</p>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                        {critical > 1 ? (
                                            <p id="text_1">It's a critical hit!</p>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                    </h1>
                                </div>
                            )
                        }
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
