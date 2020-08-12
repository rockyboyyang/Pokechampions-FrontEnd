import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const EditPokemonInfo = ({ pokemonName }) => {
    const { pokemonList, spritesApi, listOfPokemonDetails, capFirstLetter } = useContext(AppContext)
    const [selectedMove, setSelectedMove] = useState('')

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
        moveDetails.effect = results.effect_entries[0].effect
        moveDetails.effect_chance= results.effect_chance
        setSelectedMove(moveDetails)
        console.log(moveDetails)
    }

    if (Object.keys(listOfPokemonDetails).length) {
        // setPokemonType1Callback(listOfPokemonDetails[pokemonName].types[0].type.name)
        // console.log(listOfPokemonDetails)
        // console.log(listOfPokemonDetails[pokemonName])
        // setPokemonStats(listOfPokemonDetails[pokemonName].stats)
        // if (listOfPokemonDetails[pokemonName].types[1]) setPokemonType2(listOfPokemonDetails[pokemonName].types[1])
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
                            <div className="move-slot slot-1"></div>
                            <div className="move-slot slot-2"></div>
                            <div className="move-slot slot-3"></div>
                            <div className="move-slot slot-4"></div>
                        </div>
                    </div>
                    <div className="right-box">
                        <div className="moves-container">
                            {listOfPokemonDetails[pokemonName].moves.map((move) => 
                                <div className="move-selection" id={move.move.name} onClick={fetchMoveInfo}>{move.move.name}</div>
                            )}
                        </div>
                        <div className="move-description">
                            {selectedMove ? (
                                <>
                                    <div>{selectedMove.power}</div>
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

export default EditPokemonInfo;
