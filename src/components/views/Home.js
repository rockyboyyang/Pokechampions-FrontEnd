import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import BadgeContainer from '../BadgeContainer';
import BadgeInfo from './BadgeInfo';



const Home = () => {
    const { setSelectedMove, user } = useContext(AppContext)
    let history = useHistory()

    const routeToBattleSelectScreen = () => {
        history.push('./battle/gymleaders')
    }

    const routeToTeamSelectScreen = () => {
        history.push('./selectteam')
    }

    const checkForToken = () => {
        if (!localStorage.user && !localStorage.access_token) {
            history.push('/signup')
        }
    }

    useEffect(() => {
        setSelectedMove('')
        checkForToken()
    }, [])

    return (
        <div className="view-body">
            <BadgeInfo />
            <Navbar />
            <div className="center-body">
                <div className="left-box home-left-box">
                    <div id="battle-select-button" onClick={routeToBattleSelectScreen}><p>Battle</p></div>
                    <div id="team-select-button" onClick={routeToTeamSelectScreen}><p>Edit Pokemon Team</p></div>
                </div>
                <div className="right-box">
                    <BadgeContainer />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
