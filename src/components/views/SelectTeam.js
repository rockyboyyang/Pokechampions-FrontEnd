import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const SelectTeam = () => {
    const { pokemonList, spritesApi } = useContext(AppContext)
    const history = useHistory();
    const routeToPokemonBattleDetails = (e) => {
        history.push(`/select/${e.currentTarget.className}`)
        console.log(e.currentTarget)
        e.stopPropagation();
    }
    if(Object.keys(spritesApi).length) {
        return (
            <div className="view-body">
                <Navbar />
                <div className="center-body">
                <div className="left-box pokemon-list">{pokemonList.map((pokemon) => (
                    <div className={pokemon.name} onClick={routeToPokemonBattleDetails}><p>{pokemon.name}</p> <img src={spritesApi + `${pokemon.name}.gif`} /></div>
                ))}</div>
                    <div className="right-box"></div>
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
