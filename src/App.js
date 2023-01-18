import './App.css';

function App() {
  const pokemons = [
    "pikachu",
    "salamèche",
    "dracofeu"
  ]

  return (
    <>
      <header className="header">
        <h1>Formation React Avancé !</h1>
      </header>
      <ul>
        {pokemons.map((pokemon) => {
          return <li key={pokemon}>{pokemon}</li>
        })}
      </ul>
    </>
  );
}

export default App;
