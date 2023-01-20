import { render, screen } from '@testing-library/react';

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
})
