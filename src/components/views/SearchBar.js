import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext'


const SearchBar = () => {
    const { pokemonList, setFilteredPokemonList, listOfPokemonDetails } = useContext(AppContext)

    const filterPokemonList = (e) => {
        let charactersInPokemon = e.target.value.toLowerCase()
        document.querySelector('#pokemon-type-list').value = ''
        setFilteredPokemonList(pokemonList)
        let filteredPokemonList = pokemonList.filter((pokemon) => {
            return pokemon.name.includes(charactersInPokemon)
        })
        setFilteredPokemonList(filteredPokemonList)
    }

    const filterByType = (e) => {
        let pokemonType = e.target.value
        document.querySelector('#search-value').value = ''
        setFilteredPokemonList(pokemonList)
        if (!e.target.value) return
        let filteredPokemonList = pokemonList.filter((pokemon) => {
            if (listOfPokemonDetails[pokemon.name].types.length === 2) {
                if (listOfPokemonDetails[pokemon.name].types[0].type.name === pokemonType || listOfPokemonDetails[pokemon.name].types[1].type.name === pokemonType) {
                    return pokemon
                }
            } else {
                if (listOfPokemonDetails[pokemon.name].types[0].type.name === pokemonType) return pokemon
            }
        })
        setFilteredPokemonList(filteredPokemonList)
    }

    return (
        <div className="search-info-container">
            <div className="search-bar-container">
                <input placeholder="Search Pokemon" onChange={filterPokemonList} id="search-value"></input>
            </div>
            <p id="or">OR</p>
            <div className="type-list-dropdown-container">
                <label>Select a Type</label>
                <select name="pokemon-type-list" id="pokemon-type-list" onChange={filterByType}>
                    <option value="">All</option>
                    <option value="fire">Fire</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="water">Water</option>
                    <option value="flying">Flying</option>
                    <option value="grass">Grass</option>
                    <option value="poison">Poison</option>
                    <option value="electric">Electric</option>
                    <option value="ground">Ground</option>
                    <option value="psychic">Psychic</option>
                    <option value="rock">Rock</option>
                    <option value="ice">Ice</option>
                    <option value="bug">Bug</option>
                    <option value="dragon">Dragon</option>
                    <option value="ghost">Ghost</option>
                    <option value="dark">Dark</option>
                    <option value="steel">Steel</option>
                    <option value="fairy">Fairy</option>
                </select>
            </div>
        </div>
    )
}

export default SearchBar;
