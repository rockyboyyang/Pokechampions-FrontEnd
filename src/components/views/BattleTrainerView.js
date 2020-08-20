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
    const [userSlot_1Pokemon, setUserSlot_1CurrentPokemon] = useState('')
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
    const [opponentPokemonFaint, setOpponentPokemonFaint] = useState(false)
    const [battleSequence, setBattleSequence] = useState(false)
    const [userSequence, setUserSequence] = useState(false)
    const [opponentSequence, setOpponentSequence] = useState(false)
    const [switchSequence, setSwitchSequence] = useState(false)
    const [userMoveUsed, setUserMoveUsed] = useState('')
    const [opponentMoveUsed, setOpponentMoveUsed] = useState('')
    const [userPokemonStats, setUserPokemonStats] = useState({})
    const [opponentPokemonStats, setOpponentPokemonStats] = useState({})
    const [userEffective, setUserEffective] = useState('')
    const [opponentEffective, setOpponentEffective] = useState('')
    const [userCritical, setUserCritical] = useState('')
    const [opponentCritical, setOpponentCritical] = useState('')
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
        // let opponentSlot_1 = JSON.parse(opponent.slot_1)
        let userSlot_1 = JSON.parse(user.slot_1)
        let userSlot_2 = JSON.parse(user.slot_2)
        let userSlot_3 = JSON.parse(user.slot_3)
        let userSlot_4 = JSON.parse(user.slot_4)
        let userSlot_5 = JSON.parse(user.slot_5)
        let userSlot_6 = JSON.parse(user.slot_6)

        if(user.slot_1) {
            userSlot_1.remaininghp = userSlot_1.pokemonStats[0].base_stat + 60
        }
        
        if (user.slot_2) {
            userSlot_2.remaininghp = userSlot_2.pokemonStats[0].base_stat + 60
        }
        
        if (user.slot_3) {
            userSlot_3.remaininghp = userSlot_3.pokemonStats[0].base_stat + 60
        }

        if (user.slot_4) {
            userSlot_4.remaininghp = userSlot_4.pokemonStats[0].base_stat + 60
        }

        if (user.slot_5) {
            userSlot_5.remaininghp = userSlot_5.pokemonStats[0].base_stat + 60
        }

        if (user.slot_6) {
            userSlot_6.remaininghp = userSlot_6.pokemonStats[0].base_stat + 60
        }

        let opponentSlot_1 = JSON.parse(opponent.slot_1)
        let opponentSlot_2 = JSON.parse(opponent.slot_2)
        let opponentSlot_3 = JSON.parse(opponent.slot_3)
        let opponentSlot_4 = JSON.parse(opponent.slot_4)
        let opponentSlot_5 = JSON.parse(opponent.slot_5)
        let opponentSlot_6 = JSON.parse(opponent.slot_6)

        if (opponent.slot_1) {
            opponentSlot_1.remaininghp = opponentSlot_1.pokemonStats[0].base_stat + 60
        }

        if (opponent.slot_2) {
            opponentSlot_2.remaininghp = opponentSlot_2.pokemonStats[0].base_stat + 60
        }

        if (opponent.slot_3) {
            opponentSlot_3.remaininghp = opponentSlot_3.pokemonStats[0].base_stat + 60
        }

        if (opponent.slot_4) {
            opponentSlot_4.remaininghp = opponentSlot_4.pokemonStats[0].base_stat + 60
        }

        if (opponent.slot_5) {
            opponentSlot_5.remaininghp = opponentSlot_5.pokemonStats[0].base_stat + 60
        }

        if (opponent.slot_6) {
            opponentSlot_6.remaininghp = opponentSlot_6.pokemonStats[0].base_stat + 60
        }

        setUserCurrentPokemon(userSlot_1)
        setOpponentCurrentPokemon(opponentSlot_1)
        setUserSlot_1CurrentPokemon(userSlot_1)
        setUserSlot_2CurrentPokemon(userSlot_2)
        setUserSlot_3CurrentPokemon(userSlot_3)
        setUserSlot_4CurrentPokemon(userSlot_4)
        setUserSlot_5CurrentPokemon(userSlot_5)
        setUserSlot_6CurrentPokemon(userSlot_6)
        setOpponentSlot_1CurrentPokemon(opponentSlot_1)
        setOpponentSlot_2CurrentPokemon(opponentSlot_2)
        setOpponentSlot_3CurrentPokemon(opponentSlot_3)
        setOpponentSlot_4CurrentPokemon(opponentSlot_4)
        setOpponentSlot_5CurrentPokemon(opponentSlot_5)
        setOpponentSlot_6CurrentPokemon(opponentSlot_6)

        setUserPokemonStats({
            'maxhp': userSlot_1.pokemonStats[0].base_stat + 60,
            'remaininghp': userSlot_1.pokemonStats[0].base_stat + 60,
            'attack': userSlot_1.pokemonStats[1].base_stat + 5,
            'defense': userSlot_1.pokemonStats[2].base_stat + 5,
            'special-attack': userSlot_1.pokemonStats[3].base_stat + 5,
            'special-defense': userSlot_1.pokemonStats[4].base_stat + 5,
            'speed': userSlot_1.pokemonStats[5].base_stat + 5,
        })
        setOpponentPokemonStats({
            'maxhp': opponentSlot_1.pokemonStats[0].base_stat + 60,
            'remaininghp': opponentSlot_1.pokemonStats[0].base_stat + 60,
            'attack': opponentSlot_1.pokemonStats[1].base_stat + 5,
            'defense': opponentSlot_1.pokemonStats[2].base_stat + 5,
            'special_attack': opponentSlot_1.pokemonStats[3].base_stat + 5,
            'special_defense': opponentSlot_1.pokemonStats[4].base_stat + 5,
            'speed': opponentSlot_1.pokemonStats[5].base_stat + 5,
        })
        setReadyForBattle(true)
    }
    useEffect(() => {
        setSelectedMove('')
    }, [])

    const attack = async (slot, attackingPokemon, target) => {
        // e.preventDefault()

        // TODO: Have to swap userCurrentPokemon and OpponentCurrentPokemon with
        // attacking pokemon and defending pokemon
        let moveSelected;
        if (slot === 'slot_1') moveSelected = attackingPokemon.moveSlot_1;
        if (slot === 'slot_2') moveSelected = attackingPokemon.moveSlot_2;
        if (slot === 'slot_3') moveSelected = attackingPokemon.moveSlot_3;
        if (slot === 'slot_4') moveSelected = attackingPokemon.moveSlot_4;
        
        // grab selectedMove info
        const res = await fetch(`https://pokeapi.co/api/v2/type/${moveSelected.type}`)
        let result = await res.json()

        let level = 50;
        let attack;  // attacking pokemon's attack
        let defense; // defending pokemon's defense
        let power = moveSelected.power

        // checks to see which type of move it was
        if (moveSelected.damage_class === "physical") attack = attackingPokemon.pokemonStats[1].base_stat + 5;
        if (moveSelected.damage_class === "special") attack = attackingPokemon.pokemonStats[3].base_stat + 5;
        if (moveSelected.damage_class === "physical") defense = target.pokemonStats[2].base_stat + 5
        if (moveSelected.damage_class === "special") defense = target.pokemonStats[4].base_stat + 5
        // if (moveSelected.damage_class === )
        let doubleDamageTo = result.damage_relations.double_damage_to
        let halfDamageTo = result.damage_relations.half_damage_to
        let noDamageTo = result.damage_relations.no_damage_to
        let targetPokemonType = target.pokemonType

        // weather
        let stab = 1
        let targetType1 = 1
        let targetType2 = 1
        let burn = 1
        let critical = isCritical()
        let random = getRandomFloat(0.85, 1)

        // checks for stab
        if(attackingPokemon.pokemonType[0].type.name === moveSelected.type) stab = 1.5
        if (attackingPokemon.pokemonType[1]) {
            if (attackingPokemon.pokemonType[1].type.name === moveSelected.type) stab = 1.5
        }

        // checks to see if move is super effective
        for(let i = 0; i < doubleDamageTo.length; i++) {
            if (doubleDamageTo[i].name === targetPokemonType[0].type.name) targetType1 = 2
            if (targetPokemonType[1]) {
                if (doubleDamageTo[i].name === targetPokemonType[1].type.name) targetType2 = 2
            }
        }

        // checks to see if move is not very effective
        for (let i = 0; i < halfDamageTo.length; i++) {
            if (halfDamageTo[i].name === targetPokemonType[0].type.name) targetType1 = 0.5
            if (targetPokemonType[1]) {
                if (halfDamageTo[i].name === targetPokemonType[1].type.name) targetType2 = 0.5
            }
        }  
        // checks to see if move has no effect
        if(noDamageTo.length > 0) {
            if (noDamageTo[0].name === targetPokemonType[0].type.name) targetType1 = 0
            if (targetPokemonType[1]) {
                if (noDamageTo[0].name === targetPokemonType[1].type.name) targetType2 = 0
            }
        }

        // checks if burn

        // checks if weather condition

        // include weather later
        let modifier = critical * random * stab * burn * targetType1 * targetType2
        let damage = (((((2 * level) / 5) + 2) * power * (attack / defense)) / 50) + 2
        let totalDamage = Math.floor(damage * modifier)
        
        let effective = null;

        if(targetType1 + targetType2 >= 3) effective = 'Super Effective'
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
        console.log(`${attackingPokemon.pokemon} used ${moveSelected.name}`)
        return {
            'move':moveSelected.name,
            'critical': critical,
            'effective': effective,
            'damage': totalDamage,
        }
    }
    
    const hpLoss = (hp, damage) => {
        let remaininghp;
        if (hp - damage <= 0) {
            remaininghp = 0;
        } else {
            remaininghp = hp - damage;
        }
        return remaininghp
    }
    
    const opponentMoveRandomizer = () => {
        let opponentMove;
        let slot = randomIntFromInterval(1, 4);
        if (slot === 1) opponentMove = 'slot_1'
        if (slot === 2) opponentMove = 'slot_2'
        if (slot === 3) opponentMove = 'slot_3'
        if (slot === 4) opponentMove = 'slot_4'
        return opponentMove
    }

    const ifFainted = (remaininghp) => {
        if(remaininghp === 0) return true;
        return false;
    }

    const beginBattleSequence = async (e) => {
        e.preventDefault()
        let userMove = e.target.id
        let opponentMove = opponentMoveRandomizer()
        // determine opponent move
        // TODO: For now opponent will do random moves
        
        let speedTieBreaker = randomIntFromInterval(1,2)
        
        setBattleSequence(true)
        if(userPokemonStats.speed > opponentPokemonStats.speed || (userPokemonStats.speed === opponentPokemonStats.speed && speedTieBreaker === 1)) {
            let userMoveUsed = await attack(userMove, userCurrentPokemon, opponentCurrentPokemon).then((res) => res)
            let tempOppPokemon = opponentPokemonStats
            tempOppPokemon.remaininghp = hpLoss(tempOppPokemon.remaininghp, userMoveUsed.damage)
            let remainingPercentage = Math.floor((tempOppPokemon.remaininghp / opponentPokemonStats.maxhp) * 100)
            let oppHpbar = document.getElementById('opponent-hpbar')
            oppHpbar.style.width = `${remainingPercentage}%`
            setUserMoveUsed(userMoveUsed.move)
            setUserEffective(userMoveUsed.effective)
            setUserCritical(userMoveUsed.critical)
            setUserSequence(true)

            if(ifFainted(remainingPercentage)) {
                setUserSequence(false)
                setBattleSequence(false)
                // setOpponentPokemonFaint(true)
                let nextOpponent = opponentSlot_2Pokemon;
                setTimeout(() => {
                    setOpponentCurrentPokemon(nextOpponent)
                    setOpponentPokemonStats({
                        'maxhp': nextOpponent.pokemonStats[0].base_stat + 60,
                        'remaininghp': nextOpponent.pokemonStats[0].base_stat + 60,
                        'attack': nextOpponent.pokemonStats[1].base_stat + 5,
                        'defense': nextOpponent.pokemonStats[2].base_stat + 5,
                        'special_attack': nextOpponent.pokemonStats[3].base_stat + 5,
                        'special_defense': nextOpponent.pokemonStats[4].base_stat + 5,
                        'speed': nextOpponent.pokemonStats[5].base_stat + 5,
                    })
                    oppHpbar.style.width = `100%`
                }, 3000)
                return;
            }

            setTimeout(async () => {
                let opponentMoveUsed = await attack(opponentMove, opponentCurrentPokemon, userCurrentPokemon).then((res) => res)
                let tempUserPokemon = userPokemonStats
                tempUserPokemon.remaininghp = hpLoss(tempUserPokemon.remaininghp, opponentMoveUsed.damage)
                let remainingPercentage = Math.floor((tempUserPokemon.remaininghp / userPokemonStats.maxhp) * 100)
                let userHpbar = document.getElementById('user-hpbar')
                userHpbar.style.width = `${remainingPercentage}%`
                setOpponentMoveUsed(opponentMoveUsed.move)
                setOpponentEffective(opponentMoveUsed.effective)
                setOpponentCritical(opponentMoveUsed.critical)
                setUserPokemonStats(tempUserPokemon)
                setUserSequence(false)
                setOpponentSequence(true)
                setOpponentPokemonStats(tempOppPokemon)
            }, 3000)
        } else {
            let opponentMoveUsed = await attack(opponentMove, opponentCurrentPokemon, userCurrentPokemon).then((res) => res)
            let tempUserPokemon = userPokemonStats
            tempUserPokemon.remaininghp = hpLoss(tempUserPokemon.remaininghp, opponentMoveUsed.damage)
            let remainingPercentage = Math.floor((tempUserPokemon.remaininghp / userPokemonStats.maxhp) * 100)
            let userHpbar = document.getElementById('user-hpbar')
            userHpbar.style.width = `${remainingPercentage}%`
            setOpponentMoveUsed(opponentMoveUsed.move)
            setOpponentEffective(opponentMoveUsed.effective)
            setOpponentCritical(opponentMoveUsed.critical)
            setOpponentSequence(true)

            setTimeout(async () => {
                let userMoveUsed = await attack(userMove, userCurrentPokemon, opponentCurrentPokemon).then((res) => res)
                let tempOppPokemon = opponentPokemonStats
                tempOppPokemon.remaininghp = hpLoss(tempOppPokemon.remaininghp, userMoveUsed.damage)
                let remainingPercentage = Math.floor((tempOppPokemon.remaininghp / opponentPokemonStats.maxhp) * 100)
                let oppHpbar = document.getElementById('opponent-hpbar')
                oppHpbar.style.width = `${remainingPercentage}%`
                setUserMoveUsed(userMoveUsed.move)
                setUserEffective(userMoveUsed.effective)
                setUserCritical(userMoveUsed.critical)
                setOpponentPokemonStats(tempOppPokemon)
                setOpponentSequence(false)
                setUserSequence(true)
                setUserPokemonStats(tempUserPokemon)
            }, 3000)
        }
        // setBattleSequence(true)
        setTimeout(() => {
            setUserSequence(false)
            setOpponentSequence(false)
            setBattleSequence(false)
        }, 6000)
    }

    const switchOut = (e) => {
        e.stopPropagation()

        if(battleSequence) return;
        let tempUser = userCurrentPokemon;
        tempUser.remaininghp = userPokemonStats.remaininghp

        let slot = e.target.className.slice(13)
        let switchPokemon;
        if (slot === 'slot_1') switchPokemon = userSlot_1Pokemon
        if (slot === 'slot_2') switchPokemon = userSlot_2Pokemon
        if (slot === 'slot_3') switchPokemon = userSlot_3Pokemon
        if (slot === 'slot_4') switchPokemon = userSlot_4Pokemon
        if (slot === 'slot_5') switchPokemon = userSlot_5Pokemon
        if (slot === 'slot_6') switchPokemon = userSlot_6Pokemon

        if(userSlot_1Pokemon) {
            if (userSlot_1Pokemon.pokemon === tempUser.pokemon) setUserSlot_1CurrentPokemon(tempUser)
        }

        if (userSlot_2Pokemon) {
            if (userSlot_2Pokemon.pokemon === tempUser.pokemon) setUserSlot_2CurrentPokemon(tempUser)
        }

        if (userSlot_3Pokemon) {
            if (userSlot_3Pokemon.pokemon === tempUser.pokemon) setUserSlot_3CurrentPokemon(tempUser)
        }

        if (userSlot_4Pokemon) {
            if (userSlot_4Pokemon.pokemon === tempUser.pokemon) setUserSlot_4CurrentPokemon(tempUser)
        }

        if (userSlot_5Pokemon) {
            if (userSlot_5Pokemon.pokemon === tempUser.pokemon) setUserSlot_5CurrentPokemon(tempUser)
        }

        if (userSlot_6Pokemon) {
            if (userSlot_6Pokemon.pokemon === tempUser.pokemon) setUserSlot_6CurrentPokemon(tempUser)
        }

        setUserCurrentPokemon(switchPokemon)
        let switchingMonStats = {
            'maxhp': switchPokemon.pokemonStats[0].base_stat + 60,
            'remaininghp': switchPokemon.remaininghp,
            'attack': switchPokemon.pokemonStats[1].base_stat + 5,
            'defense': switchPokemon.pokemonStats[2].base_stat + 5,
            'special-attack': switchPokemon.pokemonStats[3].base_stat + 5,
            'special-defense': switchPokemon.pokemonStats[4].base_stat + 5,
            'speed': switchPokemon.pokemonStats[5].base_stat + 5,
        }

        setUserPokemonStats(switchingMonStats)

        let remainingPercentage = Math.floor((switchPokemon.remaininghp / (switchPokemon.pokemonStats[0].base_stat + 60)) * 100)
        console.log(switchPokemon.remaininghp / (switchPokemon.pokemonStats[0].base_stat + 60))
        let userHpbar = document.getElementById('user-hpbar')
        userHpbar.style.width = `${remainingPercentage}%`
        // console.log(switchPokemon)

        setBattleSequence(true)
        setSwitchSequence(true)
        setTimeout(async () => {
            setSwitchSequence(false)
            let opponentMove = opponentMoveRandomizer()
            let opponentMoveUsed = await attack(opponentMove, opponentCurrentPokemon, switchPokemon).then((res) => res)
            let tempUserPokemon = switchingMonStats
            tempUserPokemon.remaininghp = hpLoss(tempUserPokemon.remaininghp, opponentMoveUsed.damage)
            let remainingPercentage = Math.floor((tempUserPokemon.remaininghp / switchingMonStats.maxhp) * 100)
            // let userHpbar = document.getElementById('user-hpbar')
            userHpbar.style.width = `${remainingPercentage}%`
            setOpponentMoveUsed(opponentMoveUsed.move)
            setOpponentEffective(opponentMoveUsed.effective)
            setOpponentCritical(opponentMoveUsed.critical)
            setUserPokemonStats(tempUserPokemon)
            setOpponentSequence(true)
        }, 3000)
        setTimeout(() => {
            setSwitchSequence(false)
            setOpponentSequence(false)
            setBattleSequence(false)
        }, 6000)
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
                                            <div className="hpbar" id="user-hpbar"></div>
                                        </div>
                                        <p className="userhp-percentage hp-percentage">{userPokemonStats.remaininghp}/{userPokemonStats.maxhp}</p>
                                    </div>
                                    <div className="status-info-effect"></div>
                                </div>
                                <div className="opponent-pokemon-status-info status-info-container">
                                    <div className="status-info-name"><p>{capFirstLetter(opponentCurrentPokemon.pokemon)}  Lv50</p></div>
                                    <div className="status-info-hpbar">
                                        <div className="opponent-hpbar-container hpbar-container">
                                            <div className="hpbar" id="opponent-hpbar"></div>
                                        </div>
                                        <p className="opponenthp-percentage hp-percentage">{opponentPokemonStats.remaininghp}/{opponentPokemonStats.maxhp}</p>
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
                                    {userSequence ? (
                                        <h1 id='typewriter-text'>
                                            <p id="text_1">{userCurrentPokemon.pokemon} used {userMoveUsed}</p>
                                            {userEffective ? (
                                                <p id="text_1">It's {userEffective}!</p>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                            {userCritical > 1 ? (
                                                <p id="text_1">It's a critical hit!</p>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </h1>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    {opponentSequence ? (
                                        <h1 id='typewriter-text'>
                                            <p id="text_1">{opponentCurrentPokemon.pokemon} used {opponentMoveUsed}</p>
                                            {opponentEffective ? (
                                                <p id="text_1">It's {opponentEffective}!</p>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                            {opponentCritical > 1 ? (
                                                <p id="text_1">It's a critical hit!</p>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </h1>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    {switchSequence ? (
                                        <h1 id='typewriter-text'>
                                            <p id="text_1">{user.username} sent out {userCurrentPokemon.pokemon}</p>
                                        </h1>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            )
                        }
                    </div>
                    <div className="right-box team-box">
                        <h1>Pokemon Team</h1>
                        <div className="pokemon-team-container">
                            {user.slot_1 !== null ? (
                                <div className="user-pokemon-slot_1" id={userSlot_1Pokemon.pokemon} onClick={switchOut}><img className="user-pokemon-slot_1" src={spritesApi + `${JSON.parse(user.slot_1).pokemon}.gif`} /></div>
                            ) : (
                                    <div className="user-pokemon-slot_1"></div>
                                )}
                            {user.slot_2 !== null ? (
                                <div className="user-pokemon-slot_2" id={userSlot_2Pokemon.pokemon} onClick={switchOut}><img className="user-pokemon-slot_2" src={spritesApi + `${JSON.parse(user.slot_2).pokemon}.gif`} /></div>
                            ) : (
                                    <div className="user-pokemon-slot_2"></div>
                                )}
                            {user.slot_3 !== null ? (
                                <div className="user-pokemon-slot_3" id={userSlot_3Pokemon.pokemon} onClick={switchOut}><img className="user-pokemon-slot_3" src={spritesApi + `${JSON.parse(user.slot_3).pokemon}.gif`} /></div>
                            ) : (
                                    <div className="user-pokemon-slot_3"></div>
                                )}
                            {user.slot_4 !== null ? (
                                <div className="user-pokemon-slot_4" id={userSlot_4Pokemon.pokemon} onClick={switchOut}><img className="user-pokemon-slot_4" src={spritesApi + `${JSON.parse(user.slot_4).pokemon}.gif`} /></div>
                            ) : (
                                    <div className="user-pokemon-slot_4"></div>
                                )}
                            {user.slot_5 !== null ? (
                                <div className="user-pokemon-slot_5" id={userSlot_5Pokemon.pokemon} onClick={switchOut}><img className="user-pokemon-slot_5" src={spritesApi + `${JSON.parse(user.slot_5).pokemon}.gif`} /></div>
                            ) : (
                                    <div className="user-pokemon-slot_5"></div>
                                )}
                            {user.slot_6 !== null ? (
                                <div className={`user-pokemon-slot_6`} id={userSlot_6Pokemon.pokemon} onClick={switchOut}><img className="user-pokemon-slot_6" src={spritesApi + `${JSON.parse(user.slot_6).pokemon}.gif`} /></div>
                            ) : (
                                    <div className="user-pokemon-slot_6"></div>
                                )}
                        </div>
                    </div>
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
