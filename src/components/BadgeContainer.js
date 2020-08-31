import React, { useState, useContext, useReducer } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../context/AppContext'
import Boulderbadge from '../assets/images/boulderbadge.png'
import Cascadebadge from '../assets/images/cascadebadge.png'
import Thunderbadge from '../assets/images/thunderbadge.png'
import Rainbowbadge from '../assets/images/rainbowbadge.png'
import Soulbadge from '../assets/images/soulbadge.png'
import Marshbadge from '../assets/images/marshbadge.png'
import Volcanobadge from '../assets/images/volcanobadge.png'
import Earthbadge from '../assets/images/earthbadge.png'

const BadgeContainer = () => {
    const { user } = useContext(AppContext)

    return (
        <div className="badge-container">
            {user.boulderbadge ? (
                <div className='boulderbadge'>
                    <img src={Boulderbadge} />
                </div>
            ):(
                <div className='boulderbadge'><div>
            )}
        </div>
    )
}

export default BadgeContainer;
