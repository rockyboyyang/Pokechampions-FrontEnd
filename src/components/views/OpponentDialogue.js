import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'

const OpponentDialogue = () => {
    return (
        <>
            <h1>Are You Ready To Battle?</h1>
            <button onClick={clickToBattle}>Click to Battle</button>
        </>
    )
}

export default OpponentDialogue