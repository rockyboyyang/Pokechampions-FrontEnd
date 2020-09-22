import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'

const BadgeInfo = () => {
    const { badgeInfoName, badgeInfoTrainer, badgeInfoDate, badgeInfoTeam, capFirstLetter, spritesApi, shinySpritesApi, grabBadgeInfo } = useContext(AppContext)

    return (
        <div className="badge-modal" style={{ display: 'none' }}>
            <div className="badge-info-container">
                <p className="exit-modal" onClick={grabBadgeInfo}>X</p>
                <div className="badge-info">
                    <h1 className="badge-name">{capFirstLetter(badgeInfoName)}</h1>
                    <h1 className="trainer-name">{capFirstLetter(badgeInfoTrainer)}</h1>
                    <h1 className="date-obtained">{badgeInfoDate}</h1>
                </div>
                <div className="pokemon-team-container-modal">
                    <div className="pokemon-team">
                        <div className="team-slot1">
                            {badgeInfoTeam[0] ? (
                                <>
                                {badgeInfoTeam[0].isShiny ? (
                                    <img className="user-pokemon-slot_1" src={shinySpritesApi + `${badgeInfoTeam[0].name}.gif`} />
                                ) : (
                                    <img className="user-pokemon-slot_1" src={spritesApi + `${badgeInfoTeam[0].name}.gif`} />
                                )}
                                </>
                             ) : (
                                <>
                                </>
                            )}
                        </div>
                        <div className="team-slot2">
                            {badgeInfoTeam[1] ? (
                                <>
                                    {badgeInfoTeam[1].isShiny ? (
                                        <img className="user-pokemon-slot_2" src={shinySpritesApi + `${badgeInfoTeam[1].name}.gif`} />
                                    ) : (
                                            <img className="user-pokemon-slot_2" src={spritesApi + `${badgeInfoTeam[1].name}.gif`} />
                                        )}
                                </>
                            ) : (
                                    <>
                                    </>
                                )}
                        </div>
                        <div className="team-slot3">
                            {badgeInfoTeam[2] ? (
                                <>
                                    {badgeInfoTeam[2].isShiny ? (
                                        <img className="user-pokemon-slot_3" src={shinySpritesApi + `${badgeInfoTeam[2].name}.gif`} />
                                    ) : (
                                            <img className="user-pokemon-slot_3" src={spritesApi + `${badgeInfoTeam[2].name}.gif`} />
                                        )}
                                </>
                            ) : (
                                    <>
                                    </>
                                )}
                        </div>
                        <div className="team-slot4">
                            {badgeInfoTeam[3] ? (
                                <>
                                    {badgeInfoTeam[3].isShiny ? (
                                        <img className="user-pokemon-slot_4" src={shinySpritesApi + `${badgeInfoTeam[3].name}.gif`} />
                                    ) : (
                                            <img className="user-pokemon-slot_4" src={spritesApi + `${badgeInfoTeam[3].name}.gif`} />
                                        )}
                                </>
                            ) : (
                                    <>
                                    </>
                                )}
                        </div>
                        <div className="team-slot5">
                            {badgeInfoTeam[4] ? (
                                <>
                                    {badgeInfoTeam[4].isShiny ? (
                                        <img className="user-pokemon-slot_5" src={shinySpritesApi + `${badgeInfoTeam[4].name}.gif`} />
                                    ) : (
                                            <img className="user-pokemon-slot_5" src={spritesApi + `${badgeInfoTeam[4].name}.gif`} />
                                        )}
                                </>
                            ) : (
                                    <>
                                    </>
                                )}
                        </div>
                        <div className="team-slot6">
                            {badgeInfoTeam[5] ? (
                                <>
                                    {badgeInfoTeam[5].isShiny ? (
                                        <img className="user-pokemon-slot_6" src={shinySpritesApi + `${badgeInfoTeam[5].name}.gif`} />
                                    ) : (
                                            <img className="user-pokemon-slot_6" src={spritesApi + `${badgeInfoTeam[5].name}.gif`} />
                                        )}
                                </>
                            ) : (
                                    <>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BadgeInfo;
