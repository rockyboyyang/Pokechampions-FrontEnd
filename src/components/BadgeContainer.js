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
                <div className='boulderbadge'></div>
            )}
            {user.cascadebadge ? (
                <div className='cascadebadge'>
                    <img src={Cascadebadge} />
                </div>
            ) : (
                    <div className='cascadebadge'></div>
            )}
            {user.thunderbadge ? (
                <div className='thunderbadge'>
                    <img src={Thunderbadge} />
                </div>
            ) : (
                    <div className='thunderbadge'></div>
            )}
            {user.rainbowbadge ? (
                <div className='rainbowbadge'>
                    <img src={Rainbowbadge} />
                </div>
            ) : (
                    <div className='rainbowbadge'></div>
            )}
            {user.marshbadge ? (
                <div className='marshbadge'>
                    <img src={Soulbadge} />
                </div>
            ) : (
                    <div className='marshbadge'></div>
                )}
            {user.marshbadge ? (
                <div className='marshbadge'>
                    <img src={Marshbadge} />
                </div>
            ) : (
                    <div className='Marshbadge'></div>
                )}
            {user.volcanobadge ? (
                <div className='volcanobadge'>
                    <img src={Volcanobadge} />
                </div>
            ) : (
                    <div className='volcanobadge'></div>
                )}
            {user.earthbadge ? (
                <div className='earthbadge'>
                    <img src={Earthbadge} />
                </div>
            ) : (
                    <div className='earthbadge'></div>
            )}
        </div>
    )
}

export default BadgeContainer;
