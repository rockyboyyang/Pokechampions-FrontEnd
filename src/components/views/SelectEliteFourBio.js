import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import loreleiFace from '../../assets/images/lorelei-face.png'
import brunoFace from '../../assets/images/bruno-face.png'
import agathaFace from '../../assets/images/agatha-face.png'
import lanceFace from '../../assets/images/lance-face.png'
import lock from '../../assets/images/lock.png'
import BadgeContainer from '../BadgeContainer';
import BadgeInfo from './BadgeInfo'

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
        checkForAbilityToViewBio,
        user,
    } = useContext(AppContext)

    let history = useHistory();

    useEffect(() => {
        setSelectedMove('')
    }, [])

    const swapSelectionScreen = (e) => {
        e.preventDefault();
        let trainerType = e.target.id.slice(7)

        if (trainerType === 'champion' && !user.beatChampion) {
            alert('You have not defeated the Elite Four yet!')
            return;
        }

        history.push(`./${trainerType}`)
    }

    const viewTrainerBio = (e) => {
        e.preventDefault()
        let trainer = e.target.id.slice(14)
        if (!checkForAbilityToViewBio(trainer)) return
        const data = async (trainerName) => {
            const response = await fetch(backendUrl + `/api/trainers/${e.target.id.slice(14)}`);
            const { opponentData } = await response.json();
            if (response.ok) {
                setOpponent(opponentData)
                history.push(`../viewbio/${trainerName}`)
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
                        <div className="trainer-container elitefour-container">
                            {user.beatElite4_1 ? (
                                <div className="select-trainer-icon"><img src={loreleiFace} onClick={viewTrainerBio} id="select-button-lorelei"></img></div>
                            ) : (
                                    <div className="select-trainer-icon"><img src={lock} onClick={viewTrainerBio} id="select-button-lorelei"></img></div>
                                )}
                            {user.beatElite4_2 ? (
                                <div className="select-trainer-icon"><img src={brunoFace} onClick={viewTrainerBio} id="select-button-bruno"></img></div>
                            ) : (
                                <div className="select-trainer-icon"><img src={lock} onClick={viewTrainerBio} id="select-button-bruno"></img></div>
                            )}
                            {user.beatElite4_3 ? (
                                <div className="select-trainer-icon"><img src={agathaFace} onClick={viewTrainerBio} id="select-button-agatha"></img></div>
                            ) : (
                                <div className="select-trainer-icon"><img src={lock} onClick={viewTrainerBio} id="select-button-agatha"></img></div>
                            )}
                            {user.beatElite4_4 ? (
                                <div className="select-trainer-icon"><img src={lanceFace} onClick={viewTrainerBio} id="select-button-lance"></img></div>
                            ) : (
                                <div className="select-trainer-icon"><img src={lock} onClick={viewTrainerBio} id="select-button-lance"></img></div>
                            )}
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

export default BattleSelectEliteFourView;
