import { useState } from 'react';
import './App.css';
import { Battle } from './pokemon/Battle';
import { MatchMaking } from './pokemon/MatchMaking';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState([])


  return (
    <>
      <header className="header">
        <h1>Formation React Avancé !</h1>
      </header>
      <main>
        {
        selectedPokemon.length === 2 ?
          <Battle pok1={selectedPokemon[0]} pok2={selectedPokemon[1]} /> :
          <MatchMaking setSelectedPokemon={setSelectedPokemon} selectedPokemon={selectedPokemon}/>
        }
      </main>
    </>
  );
}

export default App;
