import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    let history = useHistory()

    const routeToHome = () => {
        history.push('./home')
    }

    const routeToPokedex = () => {
        history.push('./pokedex')
    }

    const routeToTrainerBio = () => {
        history.push('./trainers')
    }

    return (
        <div className="navbar">
            <div className="tab" onClick={routeToHome}><p>Home</p></div>
            <div className="tab" onClick={routeToPokedex}><p>Pokedex</p></div>
            <div className="tab" onClick={routeToTrainerBio}><p>Trainer Bio</p></div>
        </div>
    )
}

export default Navbar;
