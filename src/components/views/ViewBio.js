import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import brockFullbody from '../../assets/images/brock-fullbody.png'
import mistyFullbody from '../../assets/images/misty-fullbody.png'
import ltsurgeFullbody from '../../assets/images/ltsurge-fullbody.png'
import erikaFullbody from '../../assets/images/erika-fullbody.png'
import kogaFullbody from '../../assets/images/koga-fullbody.png'
import sabrinaFullbody from '../../assets/images/sabrina-fullbody.png'
import blaineFullbody from '../../assets/images/blaine-fullbody.png'
import giovanniFullbody from '../../assets/images/giovanni-fullbody.png'
import loreleiFullbody from '../../assets/images/lorelei-fullbody.png'
import brunoFullbody from '../../assets/images/bruno-fullbody.png'
import agathaFullbody from '../../assets/images/agatha-fullbody.png'
import lanceFullbody from '../../assets/images/lance-fullbody.png'
import rockyFace from '../../assets/images/rocky-face.png'

const ViewBio = () => {

    const { setSelectedMove, opponent, capFirstLetter, spritesApi, shinySpritesApi } = useContext(AppContext)
    let history = useHistory()
    useEffect(() => {
        if(!opponent) history.push('../selectbio/gymleaders')
    }, [])
    const getTrainerImage = () => {
        if (opponent.name === 'brock') {
            return brockFullbody
        }
        if (opponent.name === 'misty') {
            return mistyFullbody
        }
        if (opponent.name === 'ltsurge') {
            return ltsurgeFullbody
        }
        if (opponent.name === 'erika') {
            return erikaFullbody
        }
        if (opponent.name === 'koga') {
            return kogaFullbody
        }
        if (opponent.name === 'sabrina') {
            return sabrinaFullbody
        }
        if (opponent.name === 'blaine') {
            return blaineFullbody
        }
        if (opponent.name === 'giovanni') {
            return giovanniFullbody
        }
        if (opponent.name === 'lorelei') {
            return loreleiFullbody
        }
        if (opponent.name === 'bruno') {
            return brunoFullbody
        }
        if (opponent.name === 'agatha') {
            return agathaFullbody
        }
        if (opponent.name === 'lance') {
            return lanceFullbody
        }
        if (opponent.name === 'rocky') {
            return rockyFace
        }
    }

    return (
        <div className='view-body'>
            <Navbar />
            <div className="center-body">
                <div className="left-box trainer-bio-container">
                    <div className="trainer-bio-box">
                        {opponent.name === 'rocky' ? (
                            <div className="trainer-image-rocky">
                                <img src={getTrainerImage()}></img>
                            </div>
                        ) : (
                            <div className="trainer-image-bio">
                                <img src={getTrainerImage()}></img>
                            </div>
                        )}
                        <div className="outer-trainer-info">
                            <div className="outer-trainer-bio">
                                <div className="trainer-bio">
                                    <h1>Name: {capFirstLetter(opponent.name)}</h1>
                                    <h2>Trainer Class: {capFirstLetter(opponent.trainerClass)}</h2>
                                    <h4>Bio: {opponent.bio}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-box team-box">
                    <div className="header">
                        <h1>Pokemon Team</h1>
                    </div>
                    {opponent ? (
                        <div className="trainer-pokemon-team-container">
                            {opponent.slot_1 !== null ? (
                                <>
                                    {JSON.parse(opponent.slot_1).isShiny ? (
                                        <div className={`opponent-pokemon-slot_1`} id={JSON.parse(opponent.slot_1).pokemon}><img className="opponent-pokemon-slot_1" src={shinySpritesApi + `${JSON.parse(opponent.slot_1).pokemon}.gif`} /></div>
                                    ) : (
                                        <div className={`opponent-pokemon-slot_1`} id={JSON.parse(opponent.slot_1).pokemon}><img className="opponent-pokemon-slot_1" src={spritesApi + `${JSON.parse(opponent.slot_1).pokemon}.gif`} /></div>
                                    )}
                                </>
                            ) : (
                                    <div className="opponent-pokemon-slot_1"></div>
                                )}
                            {opponent.slot_2 !== null ? (
                                <>
                                    {JSON.parse(opponent.slot_2).isShiny ? (
                                        <div className={`opponent-pokemon-slot_2`} id={JSON.parse(opponent.slot_2).pokemon}><img className="opponent-pokemon-slot_2" src={shinySpritesApi + `${JSON.parse(opponent.slot_2).pokemon}.gif`} /></div>
                                    ) : (
                                        <div className={`opponent-pokemon-slot_2`} id={JSON.parse(opponent.slot_2).pokemon}><img className="opponent-pokemon-slot_2" src={spritesApi + `${JSON.parse(opponent.slot_2).pokemon}.gif`} /></div>
                                    )}
                                </>
                            ) : (
                                    <div className="opponent-pokemon-slot_2"></div>
                                )}
                            {opponent.slot_3 !== null ? (
                                <>
                                    {JSON.parse(opponent.slot_3).isShiny ? (
                                        <div className={`opponent-pokemon-slot_3`} id={JSON.parse(opponent.slot_3).pokemon}><img className="opponent-pokemon-slot_3" src={shinySpritesApi + `${JSON.parse(opponent.slot_3).pokemon}.gif`} /></div>
                                    ) : (
                                        <div className={`opponent-pokemon-slot_3`} id={JSON.parse(opponent.slot_3).pokemon}><img className="opponent-pokemon-slot_3" src={spritesApi + `${JSON.parse(opponent.slot_3).pokemon}.gif`} /></div>
                                    )}
                                </>
                            ) : (
                                    <div className="opponent-pokemon-slot_3"></div>
                                )}
                            {opponent.slot_4 !== null ? (
                                <>
                                    {JSON.parse(opponent.slot_4).isShiny ? (
                                        <div className={`opponent-pokemon-slot_4`} id={JSON.parse(opponent.slot_4).pokemon}><img className="opponent-pokemon-slot_4" src={shinySpritesApi + `${JSON.parse(opponent.slot_4).pokemon}.gif`} /></div>
                                    ) : (
                                        <div className={`opponent-pokemon-slot_4`} id={JSON.parse(opponent.slot_4).pokemon}><img className="opponent-pokemon-slot_4" src={spritesApi + `${JSON.parse(opponent.slot_4).pokemon}.gif`} /></div>
                                    )}
                                </>
                            ) : (
                                    <div className="opponent-pokemon-slot_4"></div>
                                )}
                            {opponent.slot_5 !== null ? (
                                <>
                                    {JSON.parse(opponent.slot_5).isShiny ? (
                                        <div className={`opponent-pokemon-slot_5`} id={JSON.parse(opponent.slot_5).pokemon}><img className="opponent-pokemon-slot_5" src={shinySpritesApi + `${JSON.parse(opponent.slot_5).pokemon}.gif`} /></div>
                                    ) : (
                                        <div className={`opponent-pokemon-slot_5`} id={JSON.parse(opponent.slot_5).pokemon}><img className="opponent-pokemon-slot_5" src={spritesApi + `${JSON.parse(opponent.slot_5).pokemon}.gif`} /></div>
                                    )}
                                </>
                            ) : (
                                <div className="opponent-pokemon-slot_5"></div>
                            )}
                            {opponent.slot_6 !== null ? (
                                <>
                                    {JSON.parse(opponent.slot_6).isShiny ? (
                                        <div className={`opponent-pokemon-slot_6`} id={JSON.parse(opponent.slot_6).pokemon}><img className="opponent-pokemon-slot_6" src={shinySpritesApi + `${JSON.parse(opponent.slot_6).pokemon}.gif`} /></div>
                                    ) : (
                                        <div className={`opponent-pokemon-slot_6`} id={JSON.parse(opponent.slot_6).pokemon}><img className="opponent-pokemon-slot_6" src={spritesApi + `${JSON.parse(opponent.slot_6).pokemon}.gif`} /></div>
                                    )}
                                </>
                            ) : (
                                <div className="opponent-pokemon-slot_6"></div>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ViewBio;