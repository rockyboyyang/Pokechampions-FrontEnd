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

const BattleSelectView = ({  }) => {
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
        let trainerType = e.target.id.slice(7)
        if(trainerType === 'champion') {
            alert('Champion Trainer has not yet been added!')
            return;
        }
        history.push(`./${trainerType}`)
    }

    const challengeTrainer = (e) => {
        e.preventDefault()
        
        const data = async (trainerName) => {
            const response = await fetch(backendUrl + `/api/gymleaders/${e.target.id.slice(14)}`);
            const { opponentData } = await response.json();
            if(response.ok){
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
                        <div className="trainer-container gym-leader-container">
                            <div className="select-trainer-icon"><img src={brockFace} onClick={challengeTrainer} id="select-button-brock"></img></div>
                            <div className="select-trainer-icon"><img src={mistyFace} onClick={challengeTrainer} id="select-button-misty"></img></div>
                            <div className="select-trainer-icon"><img src={ltsurgeFace} onClick={challengeTrainer} id="select-button-ltsurge"></img></div>
                            <div className="select-trainer-icon"><img src={erikaFace} onClick={challengeTrainer} id="select-button-erika"></img></div>
                            <div className="select-trainer-icon"><img src={kogaFace} onClick={challengeTrainer} id="select-button-koga"></img></div>
                            <div className="select-trainer-icon"><img src={sabrinaFace} onClick={challengeTrainer} id="select-button-sabrina"></img></div>
                            <div className="select-trainer-icon"><img src={blaineFace} onClick={challengeTrainer} id="select-button-blaine"></img></div>
                            <div className="select-trainer-icon"><img src={giovanniFace} onClick={challengeTrainer} id="select-button-giovanni"></img></div>
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

export default BattleSelectView;
