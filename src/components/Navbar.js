import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { battleSequence } = useContext(AppContext)
    let history = useHistory()

    const routeToHome = () => {
        if(battleSequence) return
        history.push('../home')
    }

    const routeToPokedex = () => {
        if (battleSequence) return
        history.push('../pokedex')
    }

    const routeToTrainerBio = () => {
        if (battleSequence) return
        history.push('../selectbio/gymleaders')
    }

    const signout = () => {
        if (battleSequence) return
        localStorage.clear()
        history.push('../')
    }

    return (
        <div className="navbar">
            <div className="tab" onClick={routeToHome}><p>Home</p></div>
            <div className="tab" onClick={routeToPokedex}><p>Pokedex</p></div>
            <div className="tab" onClick={routeToTrainerBio}><p>Bio</p></div>
            <div className='tab signout-tab' onClick={signout}><p>Sign Out</p></div>
        </div>
    )
}

export default Navbar;
