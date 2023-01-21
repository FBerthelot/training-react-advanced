import { act, render, screen, waitFor } from '../test-utils';
import { Battle } from './Battle';
import { MatchMakingContextProvider } from './MatchMaking.context';

describe('Battle', () => {
  beforeEach(() => {
      jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should make each pokemon start with 100 PV', async () => {
    render(
        <MatchMakingContextProvider value={{selectedPokemon: ["pikachu", "salamèche"]}}>
            <Battle />
        </MatchMakingContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })

    expect(screen.getByText(/pikachu -.100.PV/i)).toBeInTheDocument()
    expect(screen.getByText(/salamèche -.100.PV/i)).toBeInTheDocument()
  })

  it('should always make the defender win', async () => {
    render(
        <MatchMakingContextProvider value={{selectedPokemon: ["pikachu", "salamèche"]}}>
            <Battle />
        </MatchMakingContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })

    act(() => {
        jest.advanceTimersByTime(20000);
    })
    
    await waitFor(() => {
        expect(screen.getByText(/c'est salamèche qui a gagné/i)).toBeInTheDocument()
    })
  })
})
