import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../context/AppContext'

const Footer = () => {
    return (
        <div className="footer">
            <a className="fa fa-github-square" href='https://github.com/rockyboyyang'></a>
            <a className="fa fa-linkedin" href='https://www.linkedin.com/in/rocky-yang-8a6669b8/'></a>
        </div>
    )
}

export default Footer;
