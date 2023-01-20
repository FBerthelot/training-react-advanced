import './App.css';
import { PokemonCard } from './pokemon/PokemonCard';

function App() {
  const pokemons = [
    {name: "pikachu", generation: 1},
    {name: "salamèche", generation: 1},
    {name: "dracofeu", generation: 1}
  ]

  return (
    <>
      <header className="header">
        <h1>Formation React Avancé !</h1>
      </header>
      <main className='matchmaking'>
        {pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon}/>
        })}
      </main>
    </>
  );
}

export default App;
