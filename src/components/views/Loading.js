import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import BadgeContainer from '../BadgeContainer';
import loadingPokeball from '../../assets/images/pokeball-loading.png'

const Loading = () => {

    return (
        <div className="loading-screen">
            <div className="header-container">
                <h1 className="loading-screen-header">Loading...</h1>
                <img src={loadingPokeball} className="loading-pokeball"></img>
            </div>
        </div>
        
    )
}

export default Loading;
