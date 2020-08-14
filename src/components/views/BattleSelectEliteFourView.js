import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const BattleSelectEliteFourView = ({ gymLeader }) => {
    const { user_slot1,
        user_slot_2,
        user_slot_3,
        user_slot_4,
        user_slot_5,
        user_slot_6,
    } = useContext(AppContext)

    let history = useHistory();
    const { setSelectedMove } = useContext(AppContext)

    useEffect(() => {
        setSelectedMove('')
    }, [])

    const swapSelectionScreen = (e) => {
        e.preventDefault();
        history.push(`./${e.target.id.slice(7)}`)
    }
    return (
        <Switch>
            <div className="view-body">
                <Navbar />
                <div className="center-body">
                    <div className="left-box select-battle-view">
                        <div className="trainer-container elitefour-container">
                            <div id="misty-select-button" className="select-trainer-icon">LORELEI</div>
                            <div id="bruno-select-button" className="select-trainer-icon">BRUNO</div>
                            <div id="agatha-select-button" className="select-trainer-icon">AGATHA</div>
                            <div id="lance-select-button" className="select-trainer-icon">LANCE</div>
                        </div>
                        <div className="trainer-type-button">
                            <button onClick={swapSelectionScreen} id="button-gymleaders">Gym Leaders</button>
                            <button onClick={swapSelectionScreen} id="button-elitefour">Elite Four</button>
                            <button onClick={swapSelectionScreen} id="button-champion">Champion</button>
                        </div>
                    </div>
                    <div className="right-box"></div>
                </div>
                <Footer />
            </div>
        </Switch>
    )
}

export default BattleSelectEliteFourView;
