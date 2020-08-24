import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import loreleiFace from '../../assets/images/lorelei-face.png'
import brunoFace from '../../assets/images/bruno-face.png'
import agathaFace from '../../assets/images/agatha-face.png'
import lanceFace from '../../assets/images/lance-face.png'

const BattleSelectEliteFourView = ({ gymLeader }) => {
    const { user_slot1,
        user_slot_2,
        user_slot_3,
        user_slot_4,
        user_slot_5,
        user_slot_6,
        backendUrl,
        setOpponent,
        setSelectedMove,
    } = useContext(AppContext)

    let history = useHistory();

    useEffect(() => {
        setSelectedMove('')
    }, [])

    const swapSelectionScreen = (e) => {
        e.preventDefault();
        history.push(`./${e.target.id.slice(7)}`)
    }

    const challengeTrainer = (e) => {
        e.preventDefault()

        const data = async (trainerName) => {
            const response = await fetch(backendUrl + `/api/gymleaders/${e.target.id.slice(14)}`);
            const { opponentData } = await response.json();
            if (response.ok) {
                // console.log(JSON.parse(opponentData.slot_1))
                // console.log(JSON.parse(opponentData.slot_2))
                // console.log(JSON.parse(opponentData.slot_3))
                // console.log(JSON.parse(opponentData.slot_4))
                setOpponent(opponentData)
                history.push(`../challenge/${trainerName}`)
            }
        };
        data(e.target.id.slice(14))
    }
    return (
        <Switch>
            <div className="view-body">
                <Navbar />
                <div className="center-body">
                    <div className="left-box select-battle-view">
                        <div className="trainer-container elitefour-container">
                            <div className="select-trainer-icon"><img src={loreleiFace} onClick={challengeTrainer} id="select-button-lorelei"></img></div>
                            <div className="select-trainer-icon"><img src={brunoFace} onClick={challengeTrainer} id="select-button-bruno"></img></div>
                            <div className="select-trainer-icon"><img src={agathaFace} onClick={challengeTrainer} id="select-button-agatha"></img></div>
                            <div className="select-trainer-icon"><img src={lanceFace} onClick={challengeTrainer} id="select-button-lance"></img></div>
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
