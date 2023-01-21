import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { ErrorBoundary } from './ErrorBoundary';
import { Battle } from './pokemon/Battle';
import { MatchMaking } from './pokemon/MatchMaking';

const queryClient = new QueryClient()

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState([])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
