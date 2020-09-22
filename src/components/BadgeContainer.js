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
    const { user, backendUrl } = useContext(AppContext)
    
    const grabBadgeInfo = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        let badge = e.target.className

        const res = await fetch(backendUrl + `/api/session_user/${user.id}/badges/${badge}`)

        if (res.ok) {
            const { trainer, date, team } = await res.json();
            console.log(trainer)
            console.log(date)
            console.log(team)

        }
    }

    return (
        <div className="badge-container">
            {user.boulderbadge ? (
                <div className='boulderbadge' onClick={grabBadgeInfo}>
                    <img src={Boulderbadge} onClick={grabBadgeInfo} className='boulderbadge' />
                </div>
            ):(
                <div className='boulderbadge'></div>
            )}
            {user.cascadebadge ? (
                <div className='cascadebadge' onClick={grabBadgeInfo}>
                    <img src={Cascadebadge} className='cascadebadge' onClick={grabBadgeInfo}/>
                </div>
            ) : (
                 <div className='cascadebadge'></div>
            )}
            {user.thunderbadge ? (
                <div className='thunderbadge' onClick={grabBadgeInfo}>
                    <img src={Thunderbadge} onClick={grabBadgeInfo} className='thunderbadge'/>
                </div>
            ) : (
                <div className='thunderbadge'></div>
            )}
            {user.rainbowbadge ? (
                <div className='rainbowbadge' onClick={grabBadgeInfo}>
                    <img src={Rainbowbadge} onClick={grabBadgeInfo} className='rainbowbadge'/>
                </div>
            ) : (
                    <div className='rainbowbadge'></div>
            )}
            {user.marshbadge ? (
                <div className='soulbadge' onClick={grabBadgeInfo}>
                    <img src={Soulbadge} onClick={grabBadgeInfo} className='soulbadge'/>
                </div>
            ) : (
                    <div className='soulbadge'></div>
                )}
            {user.marshbadge ? (
                <div className='marshbadge' onClick={grabBadgeInfo}>
                    <img src={Marshbadge} onClick={grabBadgeInfo} className='marshbadge'/>
                </div>
            ) : (
                    <div className='marshbadge'></div>
                )}
            {user.volcanobadge ? (
                <div className='volcanobadge' onClick={grabBadgeInfo}>
                    <img src={Volcanobadge} onClick={grabBadgeInfo} className='volcanobadge'/>
                </div>
            ) : (
                    <div className='volcanobadge'></div>
                )}
            {user.earthbadge ? (
                <div className='earthbadge' onClick={grabBadgeInfo}>
                    <img src={Earthbadge} onClick={grabBadgeInfo} className='earthbadge'/>
                </div>
            ) : (
                    <div className='earthbadge'></div>
            )}
        </div>
    )
}

export default BadgeContainer;
