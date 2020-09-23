import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Loading from './Loading'

const SelectTeam = () => {
    const { pokemonList, setPokemonList, filteredPokemonList, setFilteredPokemonList, spritesApi, shinySpritesApi, user, setCurrentSlot, capFirstLetter, adjustName, listOfPokemonDetails, setListOfPokemonDetails } = useContext(AppContext)
    const history = useHistory();

    const routeToPokemonBattleDetails = (e) => {
        e.stopPropagation();
        history.push(`/select/${e.currentTarget.id}`)
    }

    const routeToExistingPokemonBattleDetails = (e) => {
        e.stopPropagation();
        setCurrentSlot(e.target.className.slice(13))
        history.push(`/select-existing/${e.currentTarget.id}`)
    }
    useEffect(() => {
        setTimeout(() => {
            let loading = document.querySelector('.loading-screen')
            let body = document.querySelector('.view-body')

            loading.style.display = 'none'
            body.style.display = 'grid'
        }, 5000)
        // grabAlolanFormStats()
        console.log(listOfPokemonDetails)
    }, [])
    
    // adds alolan stats from alolan forms
    // const grabAlolanFormStats = async () => {
    //     let alolaArray = [
    //         'rattata',
    //         'raticate',
    //         'raichu',
    //         'sandshrew',
    //         'sandslash',
    //         'vulpix',
    //         'ninetales',
    //         'diglett',
    //         'dugtrio',
    //         'meowth',
    //         'persian',
    //         'geodude',
    //         'graveler',
    //         'golem',
    //         'grimer',
    //         'muk',
    //         'exeggutor',
    //         'marowak']

    //     let tempDetails = listOfPokemonDetails
    //     for (let i = 0; i < alolaArray.length; i++) {
    //         let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${alolaArray[i]}-alola`);
    //         let result = await res.json()
    //         tempDetails[`${alolaArray[i]}-alola`] = result
    //     }
    //     setListOfPokemonDetails(tempDetails)
    // }

    const filterPokemonList = (e) => { 
        let charactersInPokemon = e.target.value.toLowerCase()
        document.querySelector('#pokemon-type-list').value = ''
        setFilteredPokemonList(pokemonList)
        let filteredPokemonList = pokemonList.filter((pokemon) => {
            return pokemon.name.includes(charactersInPokemon)
        })
        setFilteredPokemonList(filteredPokemonList)
    }

    const filterByType = (e) => {
        let pokemonType = e.target.value
        document.querySelector('#search-value').value = ''
        setFilteredPokemonList(pokemonList)
        if(!e.target.value) return
        let filteredPokemonList = pokemonList.filter((pokemon) => {
            if(listOfPokemonDetails[pokemon.name].types.length === 2) {
                if(listOfPokemonDetails[pokemon.name].types[0].type.name === pokemonType || listOfPokemonDetails[pokemon.name].types[1].type.name === pokemonType) {
                    return pokemon
                }
            } else {
                if (listOfPokemonDetails[pokemon.name].types[0].type.name === pokemonType) return pokemon
            }
        })
        setFilteredPokemonList(filteredPokemonList)
    }

    if(Object.keys(spritesApi).length) {
        return (
            <>
                <Loading />
                <div className="view-body" style={{ display: 'none' }}>
                    <Navbar />
                    <div className="center-body">
                    <div className="left-box pokemon-list-container">
                        <div className="search-info-container">
                            <div className="search-bar-container">
                                <input placeholder="Search Pokemon" onChange={filterPokemonList} id="search-value"></input>
                            </div>
                            <p id="or">OR</p>
                            <div className="type-list-dropdown-container">
                                <label>Select a Type</label>
                                <select name="pokemon-type-list" id="pokemon-type-list" onChange={filterByType}>
                                    <option value="">All</option>
                                    <option value="fire">Fire</option>
                                    <option value="normal">Normal</option>
                                    <option value="fighting">Fighting</option>
                                    <option value="water">Water</option>
                                    <option value="flying">Flying</option>
                                    <option value="grass">Grass</option>
                                    <option value="poison">Poison</option>
                                    <option value="electric">Electric</option>
                                    <option value="ground">Ground</option>
                                    <option value="psychic">Psychic</option>
                                    <option value="rock">Rock</option>
                                    <option value="ice">Ice</option>
                                    <option value="bug">Bug</option>
                                    <option value="dragon">Dragon</option>
                                    <option value="ghost">Ghost</option>
                                    <option value="dark">Dark</option>
                                    <option value="steel">Steel</option>
                                    <option value="fairy">Fairy</option>
                                </select>
                            </div>
                        </div>
                        <div className='pokemon-list'>
                            {filteredPokemonList ? (
                                <>
                                    {filteredPokemonList.map((pokemon) => (
                                    <div id={pokemon.name} onClick={routeToPokemonBattleDetails}><p>{capFirstLetter(pokemon.name)}</p> <img src={spritesApi + `${adjustName(pokemon.name)}.gif`} /></div>
                                    ))}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </div>
                        <div className="right-box team-box">
                            <div className="header">
                                <h1>Pokemon Team</h1>
                            </div>
                            {user ? (
                                <div className="pokemon-team-container">
                                    {user.slot_1 !== null ? (
                                        <>
                                            {JSON.parse(user.slot_1).isShiny ? (
                                                <div className={`user-pokemon-slot_1`} id={JSON.parse(user.slot_1).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_1" src={shinySpritesApi + `${JSON.parse(user.slot_1).pokemon}.gif`} /></div>
                                            ) : (
                                                <div className={`user-pokemon-slot_1`} id={JSON.parse(user.slot_1).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_1" src={spritesApi + `${JSON.parse(user.slot_1).pokemon}.gif`} /></div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-pokemon-slot_1"></div>
                                    )}
                                    {user.slot_2 !== null ? (
                                        <>
                                            {JSON.parse(user.slot_2).isShiny ? (
                                                <div className={`user-pokemon-slot_2`} id={JSON.parse(user.slot_2).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_2" src={shinySpritesApi + `${JSON.parse(user.slot_2).pokemon}.gif`} /></div>
                                            ) : (
                                                <div className={`user-pokemon-slot_2`} id={JSON.parse(user.slot_2).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_2" src={spritesApi + `${JSON.parse(user.slot_2).pokemon}.gif`} /></div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-pokemon-slot_2"></div>
                                    )}
                                    {user.slot_3 !== null ? (
                                        <>
                                            {JSON.parse(user.slot_3).isShiny ? (
                                                <div className={`user-pokemon-slot_3`} id={JSON.parse(user.slot_3).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_3" src={shinySpritesApi + `${JSON.parse(user.slot_3).pokemon}.gif`} /></div>
                                            ) : (
                                                <div className={`user-pokemon-slot_3`} id={JSON.parse(user.slot_3).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_3" src={spritesApi + `${JSON.parse(user.slot_3).pokemon}.gif`} /></div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-pokemon-slot_3"></div>
                                    )}
                                    {user.slot_4 !== null ? (
                                        <>
                                            {JSON.parse(user.slot_4).isShiny ? (
                                                <div className={`user-pokemon-slot_4`} id={JSON.parse(user.slot_4).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_4" src={shinySpritesApi + `${JSON.parse(user.slot_4).pokemon}.gif`} /></div>
                                            ) : (
                                                <div className={`user-pokemon-slot_4`} id={JSON.parse(user.slot_4).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_4" src={spritesApi + `${JSON.parse(user.slot_4).pokemon}.gif`} /></div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-pokemon-slot_4"></div>
                                    )}
                                    {user.slot_5 !== null ? (
                                        <>
                                            {JSON.parse(user.slot_5).isShiny ? (
                                                <div className={`user-pokemon-slot_5`} id={JSON.parse(user.slot_5).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_5" src={shinySpritesApi + `${JSON.parse(user.slot_5).pokemon}.gif`} /></div>
                                            ) : (
                                                <div className={`user-pokemon-slot_5`} id={JSON.parse(user.slot_5).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_5" src={spritesApi + `${JSON.parse(user.slot_5).pokemon}.gif`} /></div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-pokemon-slot_5"></div>
                                    )}
                                    {user.slot_6 !== null ? (
                                        <>
                                            {JSON.parse(user.slot_6).isShiny ? (
                                                <div className={`user-pokemon-slot_6`} id={JSON.parse(user.slot_6).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_6" src={shinySpritesApi + `${JSON.parse(user.slot_6).pokemon}.gif`} /></div>
                                            ) : (
                                                <div className={`user-pokemon-slot_6`} id={JSON.parse(user.slot_6).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_6" src={spritesApi + `${JSON.parse(user.slot_6).pokemon}.gif`} /></div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-pokemon-slot_6"></div>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
    return (
        <h1 className="loading-screen">Loading...</h1>
    )
}

export default SelectTeam;
