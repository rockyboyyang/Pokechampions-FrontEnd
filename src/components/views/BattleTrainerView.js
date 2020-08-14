import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const BattleTrainerView = () => {
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
                <div className="left-box battle-box">
                    <div className="battle-screen"></div>
                    <div className="move-slots-container">
                        <button className="move-slot slot-1">SLOT 1</button>
                        <button className="move-slot slot-2">SLOT 2</button>
                        <button className="move-slot slot-3">SLOT 3</button>
                        <button className="move-slot slot-4">SLOT 4</button>
                    </div>
                </div>
                <div className="right-box"></div>
            </div>
            <Footer />
        </div>
    )
}

export default BattleTrainerView;
