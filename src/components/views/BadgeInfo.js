import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'

const BadgeInfo = () => {
    const { setSelectedMove, pokemonList, capFirstLetter, spritesApi, adjustName, setPokemonLoaded, pokemonLoaded } = useContext(AppContext)

    return (
        <div className="badge-modal">
            <div className="badge-info-container">
                <div className="badge-info">
                    <h1 className="badge-name"></h1>
                    <h1 className="trainer-name"></h1>
                    <h1 className="date-obtained"></h1>
                </div>
                <div className="pokemon-team">
                    <div className="team-slot1"></div>
                    <div className="team-slot2"></div>
                    <div className="team-slot3"></div>
                    <div className="team-slot4"></div>
                    <div className="team-slot5"></div>
                    <div className="team-slot6"></div>
                </div>
            </div>
        </div>
    )
}

export default BadgeInfo;
