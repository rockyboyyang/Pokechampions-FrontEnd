import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const EditExistingPokemonInfo = ({ pokemonName }) => {
    const { pokemonList,
        spritesApi,
        user,
        setUser,
        listOfPokemonDetails,
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
        current_slot,
        setSelectedMove,
        adjustName,
        setListOfPokemonDetails,
    } = useContext(AppContext)

    // check if there's a current_slot
    
    const [slot_1, setSlot_1] = useState({ name: '-' })
    const [slot_2, setSlot_2] = useState({ name: '-' })
    const [slot_3, setSlot_3] = useState({ name: '-' })
    const [slot_4, setSlot_4] = useState({ name: '-' })
    // const [userSelectedPokemon, setUserSelectedPokemon] = useState({
        //     pokemon: pokemonName,
        //     pokemonType: listOfPokemonDetails[pokemonName].types,
        //     pokemonStats: listOfPokemonDetails[pokemonName].stats,
        //     moveSlot_1: slot_1,
        //     moveSlot_2: slot_2,
        //     moveSlot_3: slot_3,
        //     moveSlot_4: slot_4,
        // }) 

    let history = useHistory({ forceRefresh: true })

    useEffect(() => {
        setSelectedMove('')
        grabAlolanFormStats();
        if(!current_slot) history.push('/home')

    }, [])

    const slot_1Handler = (e) => {
        e.preventDefault()
        if (selectedMove.damage_class === 'status') {
            alert('Status moves has not yet been programmed into this application!')
            return
        }
        setSlot_1(selectedMove)
        if (slot_2.name === selectedMove.name) setSlot_2('-')
        if (slot_3.name === selectedMove.name) setSlot_3('-')
        if (slot_4.name === selectedMove.name) setSlot_4('-')
    }

    const slot_2Handler = (e) => {
        e.preventDefault()
        if (selectedMove.damage_class === 'status') {
            alert('Status moves has not yet been programmed into this application!')
            return
        }
        setSlot_2(selectedMove)
        if (slot_1.name === selectedMove.name) setSlot_1('-')
        if (slot_3.name === selectedMove.name) setSlot_3('-')
        if (slot_4.name === selectedMove.name) setSlot_4('-')
    }

    const slot_3Handler = (e) => {
        e.preventDefault()
        if (selectedMove.damage_class === 'status') {
            alert('Status moves has not yet been programmed into this application!')
            return
        }
        setSlot_3(selectedMove)
        if (slot_2.name === selectedMove.name) setSlot_2('-')
        if (slot_1.name === selectedMove.name) setSlot_1('-')
        if (slot_4.name === selectedMove.name) setSlot_4('-')
    }

    const slot_4Handler = (e) => {
        e.preventDefault()
        if(selectedMove.damage_class === 'status') {
            alert('Status moves has not yet been programmed into this application!')
            return
        }
        setSlot_4(selectedMove)
        if (slot_2.name === selectedMove.name) setSlot_2('-')
        if (slot_3.name === selectedMove.name) setSlot_3('-')
        if (slot_1.name === selectedMove.name) setSlot_1('-')
    }

    const fetchPostToUserSlot = async (e) => {
        e.preventDefault()
        setSelectedMove('')
        let pokemonInfo = {
            pokemon: pokemonName,
            pokemonType: listOfPokemonDetails[pokemonName].types,
            pokemonStats: listOfPokemonDetails[pokemonName].stats,
            moveSlot_1: slot_1,
            moveSlot_2: slot_2,
            moveSlot_3: slot_3,
            moveSlot_4: slot_4,
        };

        const res = await fetch(backendUrl + `/api/session_user/${user.id}/edit_pokemon_slot/${e.target.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pokemonInfo),
        })
        if (res.ok) {
            const { user } = await res.json();
            setUser(user)
            window.localStorage.user = JSON.stringify(user);
            setUser_slot_1(JSON.parse(user.slot_1))
            setUser_slot_2(JSON.parse(user.slot_2))
            setUser_slot_3(JSON.parse(user.slot_3))
            setUser_slot_4(JSON.parse(user.slot_4))
            setUser_slot_5(JSON.parse(user.slot_5))
            setUser_slot_6(JSON.parse(user.slot_6))
            history.push("/selectteam");
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

    const changeToAlolan = () => {
        if (pokemonName.includes('alola')) return
        history.push(`/select/${pokemonName}-alola`)
    }

    const changeToRegularForm = () => {
        if (pokemonName.includes('alola')) {
            history.push(`/select/${pokemonName.slice(0, pokemonName.length - 6)}`)
        }
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

    if (Object.keys(listOfPokemonDetails).length ) {
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
                                {/* <div className="pokemon-information-type2">{listOfPokemonDetails[pokemonName].types[1]}</div> */}
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
                            <button className="move-slot slot-1" onClick={slot_1Handler}>{capFirstLetter(slot_1.name)}</button>
                            <button className="move-slot slot-2" onClick={slot_2Handler}>{capFirstLetter(slot_2.name)}</button>
                            <button className="move-slot slot-3" onClick={slot_3Handler}>{capFirstLetter(slot_3.name)}</button>
                            <button className="move-slot slot-4" onClick={slot_4Handler}>{capFirstLetter(slot_4.name)}</button>
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
                        <div className="buttons-container">
                            <button className="add-button" id={current_slot} onClick={fetchPostToUserSlot}>Finish Editing</button>
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

export default EditExistingPokemonInfo;
