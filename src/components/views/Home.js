import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Home = () => {
    let history = useHistory()

    const routeToBattleSelectScreen = () => {
        history.push('./battle')
    }

    const routeToTeamSelectScreen = () => {
        history.push('./selectteam')
    }

    return (
        <div className="view-body">
            <Navbar />
            <div className="center-body">
                <div className="left-box home-left-box">
                    <div id="battle-select-button" onClick={routeToBattleSelectScreen}>Battle</div>
                    <div id="team-select-button" onClick={routeToTeamSelectScreen}>Edit Pokemon Team</div>
                </div>
                <div className="right-box"></div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
