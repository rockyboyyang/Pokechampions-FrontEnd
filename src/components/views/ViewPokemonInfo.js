import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const ViewPokemonInfo = ({ pokemonName }) => {
    const { pokemonList,
        spritesApi,
        user,
        setUser,
        listOfPokemonDetails,
        setListOfPokemonDetails,
        capFirstLetter,
        fetchMoveInfo,
        selectedMove,
        backendUrl,
        user_slot_1,
        user_slot_2,
        user_slot_3,
        user_slot_4,
        user_slot_5,
        user_slot_6,
        setUser_slot_1,
        setUser_slot_2,
        setUser_slot_3,
        setUser_slot_4,
        setUser_slot_5,
        setUser_slot_6,
        setCurrentSlot,
        setSelectedMove,
        adjustName,
    } = useContext(AppContext)

    let [dexEntry, setDexEntry] = useState('')
    let history = useHistory({ forceRefresh: true })


    

    const changeToAlolan = () => {
        if (pokemonName.includes('alola')) return
        history.push(`/select/${pokemonName}-alola`)
    }

    const changeToRegularForm = () => {
        if (pokemonName.includes('alola')) {
            history.push(`/select/${pokemonName.slice(0, pokemonName.length - 6)}`)
        }
    }

    const ifHaveAlolanForm = () => {
        if (
            pokemonName.includes('ratata') ||
            pokemonName.includes('raticate') ||
            pokemonName.includes('raichu') ||
            pokemonName.includes('sandshrew') ||
            pokemonName.includes('sandslash') ||
            pokemonName.includes('vulpix') ||
            pokemonName.includes('ninetales') ||
            pokemonName.includes('diglett') ||
            pokemonName.includes('dugtrio') ||
            pokemonName.includes('meowth') ||
            pokemonName.includes('persian') ||
            pokemonName.includes('geodude') ||
            pokemonName.includes('graveler') ||
            pokemonName.includes('golem') ||
            pokemonName.includes('grimer') ||
            pokemonName.includes('muk') ||
            pokemonName.includes('exeggutor') ||
            pokemonName.includes('marowak')) return true;

        return false;
    }

    const grabAlolanFormStats = async () => {
        let tempDetails = listOfPokemonDetails
        if (ifHaveAlolanForm() && !pokemonName.includes('alola')) {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}-alola`);
            let result = await res.json()
            tempDetails[`${pokemonName}-alola`] = result
        }

        setListOfPokemonDetails(tempDetails)
    }

    // Grabs Pokdex Entry
    const grabDexEntry = async () => {
        let tempName = pokemonName
        if(tempName.includes('alola')) tempName = tempName.slice(0, tempName.length - 6)
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${tempName}`)
        let result = await res.json()

        for(let i = 0; i < result.flavor_text_entries.length; i ++) {
            let descArr = result.flavor_text_entries[i]
            if(descArr.language.name === 'en') {
                setDexEntry(descArr.flavor_text)
                return
            }
        }
    }

    useEffect(() => {
        grabAlolanFormStats()
        grabDexEntry()
    }, [])

    if (Object.keys(listOfPokemonDetails).length) {
        return (
            <div className="view-body">
                <Navbar />
                <div className="center-body">
                    <div className="left-box pokemon-detail">
                        <div className="pokemon-summary">
                            <div className="pokemon-information">
                                <div className="pokemon-information-name pokemon-info-div">
                                    <p>Pokemon: </p>
                                    <p>{capFirstLetter(pokemonName)}</p>
                                </div>
                                {listOfPokemonDetails[pokemonName].types[1] ? (
                                    <>
                                        <div className="pokemon-information-type1 pokemon-info-div">
                                            <p>Type 1: </p>
                                            <p>{capFirstLetter(listOfPokemonDetails[pokemonName].types[0].type.name)}</p>
                                        </div>
                                        <div className="pokemon-information-type2 pokemon-info-div">
                                            <p>Type 2: </p>
                                            <p>{capFirstLetter(listOfPokemonDetails[pokemonName].types[1].type.name)}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="pokemon-information-type1 pokemon-info-div">
                                            <p>Type 1: </p>
                                            <p>{capFirstLetter(listOfPokemonDetails[pokemonName].types[0].type.name)}</p>
                                        </div>
                                        <div className="pokemon-information-type1 pokemon-info-div">
                                            <p>Type 2: </p>
                                            <p>None</p>
                                        </div>
                                    </>
                                    )}
                                <div className="pokemon-information-stats">
                                    {listOfPokemonDetails[pokemonName].stats.map((stat) =>
                                        <p>{stat.stat.name.toUpperCase()}: {stat.base_stat}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {ifHaveAlolanForm() ? (
                            <div className="sprite-container if-have-forms">
                                <div className="change-form-buttons">
                                    <div className="regular-form" onClick={changeToRegularForm}>Regular</div>
                                    <div className="Alolan-form" onClick={changeToAlolan}>Alolan</div>
                                </div>
                                <img src={`${spritesApi}/${adjustName(pokemonName)}.gif`} alt={pokemonName}></img>
                            </div>
                        ) : (
                                <div className="sprite-container">
                                    <img src={`${spritesApi}/${adjustName(pokemonName)}.gif`} alt={pokemonName}></img>
                                </div>
                            )}
                        <div className="move-slots-container">
                            <div className="switch-sequence-container" id='dex-entry'>
                                <h2>National Dex #: {listOfPokemonDetails[pokemonName].id}</h2>
                                <h1>{dexEntry}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="right-box description-button-container">
                        <div className="moves-container">
                            {listOfPokemonDetails[pokemonName].moves.map((move) =>
                                <div className="move-selection" id={move.move.name} onClick={fetchMoveInfo}>{capFirstLetter(move.move.name)}</div>
                            )}
                        </div>
                        <div className="move-description">
                            {selectedMove ? (
                                <>
                                    <div>
                                        <div>Name: {capFirstLetter(selectedMove.name)}</div>
                                        <div>Power: {selectedMove.power}</div>
                                        <div>PP: {selectedMove.pp}</div>
                                        <div>Damage Class: {capFirstLetter(selectedMove.damage_class)}</div>
                                        <div>Accuracy: {selectedMove.accuracy}</div>
                                        <div>Type: {capFirstLetter(selectedMove.type)}</div>
                                        <div>Description: {capFirstLetter(selectedMove.effect)}</div>
                                    </div>
                                </>
                            ) : (
                                    <div></div>
                                )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    return (
        <h1 className="loading-screen">Loading...</h1>
    )
}

export default ViewPokemonInfo;
