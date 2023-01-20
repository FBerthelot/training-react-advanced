import { render, screen } from '@testing-library/react';
import App from './App';

describe('Pokemon App', () => {
  it('should display pikachu', async () => {
    render(<App />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  })

  it('should display salamèche', async () => {
    render(<App />);

    expect(screen.getByText(/salamèche/i)).toBeInTheDocument();
  })

  it('should display dracofeu', async () => {
    render(<App />);

    expect(screen.getByText(/dracofeu/i)).toBeInTheDocument();
  })
})
