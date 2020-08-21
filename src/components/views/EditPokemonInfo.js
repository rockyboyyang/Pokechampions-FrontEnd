import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const EditPokemonInfo = ({ pokemonName }) => {
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
            setCurrentSlot,
            setSelectedMove  
        } = useContext(AppContext)
        
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
    let history = useHistory({ forceRefresh:true })
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
        setSlot_4(selectedMove)
        if (selectedMove.damage_class === 'status') {
            alert('Status moves has not yet been programmed into this application!')
            return
        }
        if (slot_2.name === selectedMove.name) setSlot_2('-')
        if (slot_3.name === selectedMove.name) setSlot_3('-')
        if (slot_1.name=== selectedMove.name) setSlot_1('-')
    }

    const fetchPostToUserSlot = async(e) => {
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
            console.log(user)
            setUser_slot_1(JSON.parse(user.slot_1)) 
            setUser_slot_2(JSON.parse(user.slot_2))
            setUser_slot_3(JSON.parse(user.slot_3))
            setUser_slot_4(JSON.parse(user.slot_4))
            setUser_slot_5(JSON.parse(user.slot_5))
            setUser_slot_6(JSON.parse(user.slot_6))
            history.push("/selectteam");
        }
    }

    const editingExistingMember = () => {
        if (user_slot_1 !== null && user_slot_1.pokemon === pokemonName) {
            setCurrentSlot('slot_1')
            history.push(`/select-existing/${pokemonName}`)
        }

        if (user_slot_2 !== null && user_slot_2.pokemon === pokemonName) {
            setCurrentSlot('slot_2')
            history.push(`/select-existing/${pokemonName}`)
        }

        if (user_slot_3 !== null && user_slot_3.pokemon === pokemonName) {
            setCurrentSlot('slot_3')
            history.push(`/select-existing/${pokemonName}`)
        }

        if (user_slot_4 !== null && user_slot_4.pokemon === pokemonName) {
            setCurrentSlot('slot_4')
            history.push(`/select-existing/${pokemonName}`)
        }

        if (user_slot_5 !== null && user_slot_5.pokemon === pokemonName) {
            setCurrentSlot('slot_5')
            history.push(`/select-existing/${pokemonName}`)
        }

        if (user_slot_6 !== null && user_slot_6.pokemon === pokemonName) {
            setCurrentSlot('slot_6')
            history.push(`/select-existing/${pokemonName}`)
        }
    }

     useEffect(() => {
       editingExistingMember()
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
                                {/* <div className="pokemon-information-type2">{listOfPokemonDetails[pokemonName].types[1]}</div> */}
                                <div className="pokemon-information-stats">
                                    {listOfPokemonDetails[pokemonName].stats.map((stat) => 
                                        <p>{stat.stat.name.toUpperCase()}: {stat.base_stat}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="sprite-container"><img src={`${spritesApi}/${pokemonName}.gif`} alt={pokemonName}></img></div>
                        <div className="move-slots-container">
                            <button className="move-slot slot-1" onClick={slot_1Handler}>{slot_1.name}</button>
                            <button className="move-slot slot-2" onClick={slot_2Handler}>{slot_2.name}</button>
                            <button className="move-slot slot-3" onClick={slot_3Handler}>{slot_3.name}</button>
                            <button className="move-slot slot-4" onClick={slot_4Handler}>{slot_4.name}</button>
                        </div>
                    </div>
                    <div className="right-box description-button-container">
                        <div className="moves-container">
                            {listOfPokemonDetails[pokemonName].moves.map((move) => 
                                <div className="move-selection" id={move.move.name} onClick={fetchMoveInfo}>{move.move.name}</div>
                            )}
                        </div>
                        <div className="move-description">
                            {selectedMove ? (
                                <>
                                    <div>
                                        <div>Power: {selectedMove.power}</div>
                                        <div>PP: {selectedMove.pp}</div>
                                        <div>Accuracy: {selectedMove.Accuracy}</div>
                                        <div>Type: {selectedMove.type}</div>
                                        <div>Description: {selectedMove.effect}</div>
                                    </div>
                                </>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className="button-containers">
                            <button className="add-button" id="slot_1" onClick={fetchPostToUserSlot}>Slot 1</button>
                            <button className="add-button" id="slot_2" onClick={fetchPostToUserSlot}>Slot 2</button>
                            <button className="add-button" id="slot_3" onClick={fetchPostToUserSlot}>Slot 3</button>
                            <button className="add-button" id="slot_4" onClick={fetchPostToUserSlot}>Slot 4</button>
                            <button className="add-button" id="slot_5" onClick={fetchPostToUserSlot}>Slot 5</button>
                            <button className="add-button" id="slot_6" onClick={fetchPostToUserSlot}>Slot 6</button>
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

export default EditPokemonInfo;
