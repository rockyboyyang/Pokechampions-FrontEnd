import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const SelectTeam = () => {
    const { pokemonList, spritesList } = useContext(AppContext)

    if(Object.keys(spritesList).length) {
        return (
            <div className="view-body">
                <Navbar />
                <div className="center-body">
                <div className="left-box pokemon-list">{pokemonList.map((pokemon) => (
                    <div><p>{pokemon.name}</p> <img src={spritesList[pokemon.name].front_default}></img></div>
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
