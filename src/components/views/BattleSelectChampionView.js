import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import BadgeContainer from '../BadgeContainer';
import rockyFace from '../../assets/images/rocky-face.png'
import BadgeInfo from './BadgeInfo'

const BattleSelectChampionView = ({ }) => {
    const { user_slot1,
        user_slot_2,
        user_slot_3,
        user_slot_4,
        user_slot_5,
        user_slot_6,
        backendUrl,
        setOpponent,
        setSelectedMove,
        user,
        checkForAbilityToChallenge
    } = useContext(AppContext)

    let history = useHistory();

    useEffect(() => {
        setSelectedMove('')
    }, [])

    const swapSelectionScreen = (e) => {
        e.preventDefault();
        let trainerType = e.target.id.slice(7)

        if (trainerType === 'elitefour' && !user.earthbadge) {
            alert('You have not collected all 8 Gym Badges yet!')
            return;
        }

        history.push(`./${trainerType}`)
    }

    const challengeTrainer = (e) => {
        e.preventDefault()
        let trainer = e.target.id.slice(14)
        if (!checkForAbilityToChallenge(trainer)) return
        const data = async (trainerName) => {
            const response = await fetch(backendUrl + `/api/trainers/${e.target.id.slice(14)}`);
            const { opponentData } = await response.json();
            if (response.ok) {
                setOpponent(opponentData)
                history.push(`../challenge/${trainerName}`)
            }
        };
        data(trainer)
    }

    return (
        <Switch>
            <div className="view-body">
                <BadgeInfo />
                <Navbar />
                <div className="center-body">
                    <div className="left-box select-battle-view">
                        <div className="trainer-container champion-container">
                            <div className="select-trainer-icon select-trainer-champion-icon">
                                <img src={rockyFace} onClick={challengeTrainer} id="select-button-rocky"></img>
                            </div>
                        </div>
                        <div className="trainer-type-button">
                            <button onClick={swapSelectionScreen} id="button-gymleaders">Gym Leaders</button>
                            <button onClick={swapSelectionScreen} id="button-elitefour">Elite Four</button>
                            <button onClick={swapSelectionScreen} id="button-champion">Champion</button>
                        </div>
                    </div>
                    <div className="right-box">
                        <BadgeContainer />
                    </div>
                </div>
                <Footer />
            </div>
        </Switch>
    )
}

export default BattleSelectChampionView;
