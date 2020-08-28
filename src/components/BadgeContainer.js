import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../context/AppContext'

const BadgeContainer = () => {
    return (
        <div className="badge-container">
            <div className='cascadebadge'></div>
            <div className='boulderbadge'></div>
            <div className='thunderbadge'></div>
            <div className='rainbowbadge'></div>
            <div className='soulbadge'></div>
            <div className='marshbadge'></div>
            <div className='volcanobadge'></div>
            <div className='earthbadge'></div>
        </div>
    )
}

export default BadgeContainer;
