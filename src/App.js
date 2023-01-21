import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { ErrorBoundary } from './ErrorBoundary';
import { Battle } from './pokemon/Battle';
import { MatchMaking } from './pokemon/MatchMaking';
import { MatchMakingContextProvider, useMatchMakingData } from './pokemon/MatchMaking.context';

const queryClient = new QueryClient()

function App() {
  const {selectedPokemon, handleTogglePokemon} = useMatchMakingData()

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <header className="header">
          <h1>Formation React Avancé !</h1>
        </header>
        <main>
          <MatchMakingContextProvider value={{selectedPokemon, handleTogglePokemon}}>
          {
          selectedPokemon.length === 2 ?
            <Battle /> :
            <MatchMaking />
          }
          </MatchMakingContextProvider>
        </main>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
