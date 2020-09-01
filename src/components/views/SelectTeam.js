import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const SelectTeam = () => {
    const { pokemonList, spritesApi, user, setCurrentSlot, capFirstLetter } = useContext(AppContext)
    const history = useHistory();

    const routeToPokemonBattleDetails = (e) => {
        e.stopPropagation();
        history.push(`/select/${e.currentTarget.id}`)
    }

    const routeToExistingPokemonBattleDetails = (e) => {
        e.stopPropagation();
        setCurrentSlot(e.target.className.slice(13))
        console.log(e.target.className)
        history.push(`/select-existing/${e.currentTarget.id}`)
    }
    // useEffect(() => {
    //     window.location.reload(true)
    // }, [])
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

    if(Object.keys(spritesApi).length) {
        return (
            <div className="view-body">
                <Navbar />
                <div className="center-body">
                <div className="left-box pokemon-list">{pokemonList.map((pokemon) => (
                    <div id={pokemon.name} onClick={routeToPokemonBattleDetails}><p>{capFirstLetter(pokemon.name)}</p> <img src={spritesApi + `${adjustName(pokemon.name)}.gif`} /></div>
                ))}</div>
                    <div className="right-box team-box">
                        <div className="header">
                            <h1>Pokemon Team</h1>
                        </div>
                        <div className="pokemon-team-container">
                            {user.slot_1 !== null ? (
                                <div className="user-pokemon-slot_1" id={JSON.parse(user.slot_1).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_1" src={spritesApi + `${JSON.parse(user.slot_1).pokemon}.gif`} /></div>
                            ) : (
                                <div className="user-pokemon-slot_1"></div>
                            )}
                            {user.slot_2 !== null ? (
                                <div className="user-pokemon-slot_2" id={JSON.parse(user.slot_2).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_2" src={spritesApi + `${JSON.parse(user.slot_2).pokemon}.gif`} /></div>
                            ) : (
                                 <div className="user-pokemon-slot_2"></div>
                            )}
                            {user.slot_3 !== null ? (
                                <div className="user-pokemon-slot_3" id={JSON.parse(user.slot_3).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_3" src={spritesApi + `${JSON.parse(user.slot_3).pokemon}.gif`} /></div>
                            ) : (
                                <div className="user-pokemon-slot_3"></div>
                            )}
                            {user.slot_4 !== null ? (
                                <div className="user-pokemon-slot_4" id={JSON.parse(user.slot_4).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_4" src={spritesApi + `${JSON.parse(user.slot_4).pokemon}.gif`} /></div>
                            ) : (
                                <div className="user-pokemon-slot_4"></div>
                            )}
                            {user.slot_5 !== null ? (
                                <div className="user-pokemon-slot_5" id={JSON.parse(user.slot_5).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_5" src={spritesApi + `${JSON.parse(user.slot_5).pokemon}.gif`} /></div>
                            ) : (
                                 <div className="user-pokemon-slot_5"></div>
                            )}
                            {user.slot_6 !== null ? (
                                <div className={`user-pokemon-slot_6`} id={JSON.parse(user.slot_6).pokemon} onClick={routeToExistingPokemonBattleDetails}><img className="user-pokemon-slot_6" src={spritesApi + `${JSON.parse(user.slot_6).pokemon}.gif`} /></div>
                            ) : (
                                <div className="user-pokemon-slot_6"></div>
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

export default SelectTeam;
