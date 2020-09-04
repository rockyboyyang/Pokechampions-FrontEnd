import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import BadgeContainer from '../BadgeContainer';

const Pokedex = () => {
    const { setSelectedMove, pokemonList, capFirstLetter, spritesApi, adjustName } = useContext(AppContext)
    let history = useHistory();
    useEffect(() => {
        setSelectedMove('')
    }, [])

    const routeToPokemonDetails = (e) => {
        e.stopPropagation();
        history.push(`/viewpokemon/${e.currentTarget.id}`)
    }

    return (
        <div className="view-body">
            <Navbar />
            <div className="center-body">
                <div className="left-box pokemon-list">{pokemonList.map((pokemon) => (
                    <div id={pokemon.name} onClick={routeToPokemonDetails}><p>{capFirstLetter(pokemon.name)}</p> <img src={spritesApi + `${adjustName(pokemon.name)}.gif`} /></div>
                ))}</div>
                <div className="right-box">
                    <BadgeContainer />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Pokedex;
