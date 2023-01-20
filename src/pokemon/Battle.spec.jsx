import { act, render, screen, waitFor } from '@testing-library/react';
import { Battle } from './Battle';

describe('Battle', () => {
  beforeEach(() => {
      jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should make each pokemon start with 100 PV', async () => {
    render(<Battle pok1="pikachu" pok2="salamèche" />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })

    expect(screen.getByText(/pikachu -.100.PV/i)).toBeInTheDocument()
    expect(screen.getByText(/salamèche -.100.PV/i)).toBeInTheDocument()
  })

  it('should always make the defender win', async () => {
    render(<Battle pok1="pikachu" pok2="salamèche" />);

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
