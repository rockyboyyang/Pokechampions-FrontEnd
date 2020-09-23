import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import BadgeContainer from '../BadgeContainer';
import Loading from './Loading'
import BadgeInfo from './BadgeInfo'
import SearchBar from './SearchBar'


const Pokedex = () => {
    const { setSelectedMove, filteredPokemonList, capFirstLetter, spritesApi, adjustName, setPokemonLoaded, pokemonLoaded } = useContext(AppContext)

    let history = useHistory();
    useEffect(() => {
        setSelectedMove('')
        setTimeout(() => {
            let loading = document.querySelector('.loading-screen')
            let body = document.querySelector('.view-body')

            loading.style.display = 'none'
            body.style.display = 'grid'
        }, 5000)
    }, [])

    const routeToPokemonDetails = (e) => {
        e.stopPropagation();
        history.push(`/viewpokemon/${e.currentTarget.id}`)
    }

    return (
        <>
            <Loading />
            <div className="view-body" style={{display:'none'}}>
                <BadgeInfo />
                <Navbar />
                <div className="center-body">
                    <div className="left-box pokemon-list-container">
                        <SearchBar />
                        <div className='pokemon-list'>
                            {filteredPokemonList ? (
                                <>
                                    {filteredPokemonList.map((pokemon) => (
                                        <div id={pokemon.name} onClick={routeToPokemonDetails}><p>{capFirstLetter(pokemon.name)}</p> <img src={spritesApi + `${adjustName(pokemon.name)}.gif`} /></div>
                                    ))}
                                </>
                            ) : (
                                    <>
                                    </>
                                )}
                        </div>
                    </div>
                    <div className="right-box">
                        <BadgeContainer />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Pokedex;
