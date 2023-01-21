import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('Pokemon App', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch')
      .mockImplementation((url) => {
        return Promise.resolve({
          ok: true,
          json: () => {
            if(url === 'https://pokeapi.co/api/v2/generation/1') {
              return Promise.resolve({
                pokemon_species: [{name: 'pikachu'}, {name: "salamèche"}]
              })
            }
            return Promise.resolve({
              pokemon_species: [{name: 'dracofeu'}]
            });
          }
        })
      })

      jest.useFakeTimers()
  })

  afterEach(() => {
    jest.spyOn(window, 'fetch').mockClear()
    act(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })
  })


  it('should display pikachu', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })
  })

  it('should display salamèche', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/salamèche/i)).toBeInTheDocument();
    })
  })

  it('should display dracofeu', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/dracofeu/i)).toBeInTheDocument();
    })
  })

  it("should select pikachu when click on it", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })

    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked()

    fireEvent.click(screen.getByText(/pikachu/i));

    expect(screen.getAllByRole('checkbox')[0]).toBeChecked()
  })

  it("should select pikachu when click twice on it", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })

    fireEvent.click(screen.getByText(/pikachu/i));
    fireEvent.click(screen.getByText(/pikachu/i));

    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked()
  })

  it('should start the battle when selecting 2 pokemon', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })

    fireEvent.click(screen.getByText(/pikachu/i));
    fireEvent.click(screen.getByText(/salamèche/i));

    expect(screen.getByText(/pikachu -.100.PV/i)).toBeInTheDocument()
  })
})
