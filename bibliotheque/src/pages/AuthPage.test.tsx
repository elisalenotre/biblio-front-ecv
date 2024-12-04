import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthPage from './AuthPage';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AuthPage', () => {
  it('should render the form with role selection', () => {
    render(
      <Router>
        <AuthPage />
      </Router>
    );

    expect(screen.getByLabelText(/Choisir un rôle/i)).toBeInTheDocument();
    expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
  });

  it('should navigate to /emprunteur when emprunteur is selected', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(mockNavigate);

    render(
      <Router>
        <AuthPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Choisir un rôle/i), {
      target: { value: 'emprunteur' },
    });

    fireEvent.click(screen.getByText(/Se connecter/i));

    expect(mockNavigate).toHaveBeenCalledWith('/emprunteur');
  });

  it('should navigate to /bibliothecaire when bibliothecaire is selected', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(mockNavigate);

    render(
      <Router>
        <AuthPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Choisir un rôle/i), {
      target: { value: 'bibliothecaire' },
    });

    fireEvent.click(screen.getByText(/Se connecter/i));

    expect(mockNavigate).toHaveBeenCalledWith('/bibliothecaire');
  });

  it('should show an alert if no role is selected', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Router>
        <AuthPage />
      </Router>
    );

    fireEvent.click(screen.getByText(/Se connecter/i));

    expect(alertSpy).toHaveBeenCalledWith('Veuillez choisir un rôle valide');

    alertSpy.mockRestore();
  });
});