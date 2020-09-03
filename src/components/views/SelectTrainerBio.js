import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'

const SelectTrainerBio = () => {
    return (
        <div className="view-body">
            <Navbar />
            <div className="center-body">
                <div className="left-box">TRAINER</div>
                <div className="right-box"></div>
            </div>
            <Footer />
        </div>
    )
}

export default SelectTrainerBio;
