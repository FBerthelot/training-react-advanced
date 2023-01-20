import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PokemonCard } from './PokemonCard';

describe('Pokemon Card', () => {
  it('should display special text when generation is 1', async () => {
    render(<PokemonCard selected onSelect={jest.fn()} pokemon={{name: 'Pikachu', generation: 1}} />);

    expect(screen.getByText(/La meilleur des génération/i)).toBeInTheDocument()
  })

  it('should not display special text when generation is other than 1', async () => {
    render(<PokemonCard selected onSelect={jest.fn()} pokemon={{name: 'Pikachu', generation: 2}} />);

    expect(screen.queryByText(/La meilleur des génération/i)).not.toBeInTheDocument()
  })

  it('should display pokemon stats when mouse enter on pokemon name', async () => {
    jest.spyOn(window, 'fetch')
      .mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => {
            return Promise.resolve({
                base_happiness: 50,
                capture_rate: 42
            });
          }
        })
      })

    render(<PokemonCard selected onSelect={jest.fn()} pokemon={{name: 'Pikachu', generation: 2}} />);

    userEvent.hover(screen.getByRole('heading'))

    expect(screen.getByText(/chargement.../i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByText(/chargement.../i)).not.toBeInTheDocument();
    })

    expect(screen.getByText(/Bonheur: 50/i)).toBeInTheDocument();
    expect(screen.getByText(/Ratio de capture: 42/i)).toBeInTheDocument()
  })
})
