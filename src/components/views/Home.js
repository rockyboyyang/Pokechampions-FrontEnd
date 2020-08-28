import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import BadgeContainer from '../BadgeContainer';
import Boulderbadge from '../../assets/images/boulderbadge.png'
import Cascadebadge from '../../assets/images/cascadebadge.png'
import Thunderbadge from '../../assets/images/thunderbadge.png'
import Rainbowbadge from '../../assets/images/rainbowbadge.png'
import Soulbadge from '../../assets/images/soulbadge.png'
import Marshbadge from '../../assets/images/marshbadge.png'
import Volcanobadge from '../../assets/images/volcanobadge.png'
import Earthbadge from '../../assets/images/earthbadge.png'


const Home = () => {
    const { setSelectedMove, } = useContext(AppContext)
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
