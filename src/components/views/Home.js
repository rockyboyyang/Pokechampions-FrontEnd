import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Home = () => {
    const { setSelectedMove } = useContext(AppContext)
    let history = useHistory()

    const routeToBattleSelectScreen = () => {
        history.push('./battle/gymleaders')
    }

    const routeToTeamSelectScreen = () => {
        history.push('./selectteam')
    }

    useEffect(() => {
        setSelectedMove('')
    }, [])

    return (
        <div className="view-body">
            <Navbar />
            <div className="center-body">
                <div className="left-box home-left-box">
                    <div id="battle-select-button" onClick={routeToBattleSelectScreen}><p>Battle</p></div>
                    <div id="team-select-button" onClick={routeToTeamSelectScreen}><p>Edit Pokemon Team</p></div>
                </div>
                <div className="right-box"></div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
