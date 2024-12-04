import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const renderWithRouter = (ui: JSX.Element) => {
  return render(<Router>{ui}</Router>);
};

describe('App', () => {
  it('should render AuthPage at the root route', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
  });

  it('should navigate to EmprunteurPage when clicking on the emprunteur route', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Emprunteur/i));

    expect(screen.getByText(/Page Emprunteur/i)).toBeInTheDocument(); 
  });

  it('should navigate to BibliothecairePage when clicking on the bibliothecaire route', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Bibliothécaire/i));

    expect(screen.getByText(/Page Bibliothécaire/i)).toBeInTheDocument(); 
});
});