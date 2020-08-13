import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Pokedex = () => {
    const { setSelectedMove } = useContext(AppContext)

    useEffect(() => {
        setSelectedMove('')
    }, [])

    return (
        <div className="view-body">
            <Navbar />
            <div className="center-body">
                <div className="left-box">POKEDEX</div>
                <div className="right-box"></div>
            </div>
            <Footer />
        </div>
    )
}

export default Pokedex;
