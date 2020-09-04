import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import brockFace from '../../assets/images/brock-face.png'
import mistyFace from '../../assets/images/misty-face.png'
import ltsurgeFace from '../../assets/images/ltsurge-face.png'
import erikaFace from '../../assets/images/erika-face.png'
import kogaFace from '../../assets/images/koga-face.png'
import sabrinaFace from '../../assets/images/sabrina-face.png'
import blaineFace from '../../assets/images/blaine-face.png'
import giovanniFace from '../../assets/images/giovanni-face.png'
import lock from '../../assets/images/lock.png'
import BadgeContainer from '../BadgeContainer';

const SelectTrainerBio = ({  }) => {
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
            checkForAbilityToChallenge,
            checkForAbilityToViewBio,
        } = useContext(AppContext)
    
    let history = useHistory();
    
    useEffect(() => {
        setSelectedMove('')
    }, [])

    const swapSelectionScreen = (e) => {
        e.preventDefault();
        let trainerType = e.target.id.slice(7)

        if(trainerType === 'elitefour' && !user.earthbadge) {
            alert('You have not collected all 8 Gym Badges yet!')
            return;
        }

        if (trainerType === 'champion' && !user.beatChampion) {
            alert('You have not defeated the Elite Four yet!')
            return;
        }
        
        history.push(`./${trainerType}`)
    }

    const viewTrainerBio = (e) => {
        e.preventDefault()
        let trainer = e.target.id.slice(14)
        if(!checkForAbilityToViewBio(trainer)) return
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
                <Navbar />
                <div className="center-body">
                    <div className="left-box select-battle-view">
                        <div className="trainer-container gym-leader-container">
                            <div className="select-trainer-icon">
                                {user.boulderbadge ? (
                                    <img src={brockFace} onClick={viewTrainerBio} id="select-button-brock"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-brock"></img>
                                )}
                            </div>
                            <div className="select-trainer-icon">
                                {user.cascadebadge ? (
                                    <img src={mistyFace} onClick={viewTrainerBio} id="select-button-misty"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-misty"></img>
                                )}
                            </div>
                            <div className="select-trainer-icon">
                                {user.thunderbadge ? (
                                    <img src={ltsurgeFace} onClick={viewTrainerBio} id="select-button-ltsurge"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-ltsurge"></img>
                                )}
                            </div>
                            <div className="select-trainer-icon">
                                {user.rainbowbadge ? (
                                    <img src={erikaFace} onClick={viewTrainerBio} id="select-button-erika"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-erika"></img>
                                    )}
                            </div>
                            <div className="select-trainer-icon">
                                {user.soulbadge ? (
                                    <img src={kogaFace} onClick={viewTrainerBio} id="select-button-koga"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-koga"></img>
                                    )}
                            </div>
                            <div className="select-trainer-icon">
                                {user.marshbadge ? (
                                    <img src={sabrinaFace} onClick={viewTrainerBio} id="select-button-sabrina"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-sabrina"></img>
                                    )}
                            </div>
                            <div className="select-trainer-icon">
                                {user.volcanobadge ? (
                                    <img src={blaineFace} onClick={viewTrainerBio} id="select-button-blaine"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-blaine"></img>
                                    )}
                            </div>
                            <div className="select-trainer-icon">
                                {user.earthbadge ? (
                                    <img src={giovanniFace} onClick={viewTrainerBio} id="select-button-giovanni"></img>
                                ) : (
                                    <img src={lock} onClick={viewTrainerBio} className="lockimage" id="select-button-giovanni"></img>
                                    )}
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

export default SelectTrainerBio;
