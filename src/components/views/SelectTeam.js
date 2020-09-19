import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Loading from './Loading'

const SelectTeam = () => {
    const { pokemonList, spritesApi, shinySpritesApi, user, setCurrentSlot, capFirstLetter, adjustName } = useContext(AppContext)
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
        }, 3000)
    }, [])
    

    if(Object.keys(spritesApi).length) {
        return (
            <>
                <Loading />
                <div className="view-body" style={{ display: 'none' }}>
                    <Navbar />
                    <div className="center-body">
                    <div className="left-box pokemon-list">{pokemonList.map((pokemon) => (
                        <div id={pokemon.name} onClick={routeToPokemonBattleDetails}><p>{capFirstLetter(pokemon.name)}</p> <img src={spritesApi + `${adjustName(pokemon.name)}.gif`} /></div>
                    ))}</div>
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
