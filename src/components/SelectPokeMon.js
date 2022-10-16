import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const pokemons = [];

const SelectPokeMon = () => {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [pokemonNames, setPokemonNames] = useState([]);
  let storedPokemon = '';

  if(window.localStorage.getItem('pokemon') !== null){
    storedPokemon = JSON.parse(window.localStorage.getItem('pokemon'));
  }

  const getPokemonInfo = async() =>{
     const res1 = await axios.get(url);
     setPokemonNames(res1.data.results.map(n => n.name));
     pokemonNames.map(async(n)=>{
        const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${n}`);
        pokemons.push(res2 );
     });
     if(res1.data.next !== null){
        setUrl(res1.data.next);
     }
  }

  useEffect(()=>{
    getPokemonInfo();
  },[url]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState("" || storedPokemon);

  const searchHandler = (e) =>{
    setSearchTerm(e.target.value);
  }

  const clickHandler = (pokemonName) =>{
    setSelectedPokemon(pokemonName);
    window.localStorage.setItem('pokemon', JSON.stringify(pokemonName));
  }

  return (
    <div className="pokemon-container">
      <div className="pokemon-header">
        <h1>Select your favourite pokemon</h1>
      </div>
      <input placeholder='Search a pokemon by name or type' onChange={(e)=>searchHandler(e)}></input>
      {selectedPokemon &&
      <div className="selected-pokemon">
        {selectedPokemon}
        <button className="delete-selected-pokemon" onClick={(e)=>{setSelectedPokemon("")}}>X</button>
      </div>
      }
        <div className="pokemon-wrapper">
          {pokemons.filter((pokemon)=>{
            if (searchTerm === "") {
              return pokemon;
            }
            else if(pokemon.data.name.toLowerCase().includes(searchTerm.toLowerCase()) || pokemon.data.types[0].type.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return pokemon;
            }
          })
          .map((pokemon,index)=>{
            return <button key={index} onClick={()=>{clickHandler(pokemon.data.name)}} className={`pokemon-card ${selectedPokemon === pokemon.data.name?'pokemon-card-selected':''}`}>
              <div>
                <img src={pokemon.data.sprites.front_default} className="pokemon-image" alt="PokemonImage"></img>
              </div>
              <div className="pokemon-name"> 
                Name : {pokemon.data.name}
              </div>
              <br></br>
              <div className="pokemon-type">
                Type : {pokemon.data.types[0].type.name}
              </div>
            </button>
          })}
        </div>
      <div className="select-buttons">
         <Link to='/'><button>Prev</button></Link>
         <Link to='/review'><button disabled={selectedPokemon===""}>Next</button></Link>
      </div>
    </div>
  );
}

export default SelectPokeMon;
