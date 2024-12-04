import { render, screen, fireEvent } from '@testing-library/react';
import EmprunteurPage from './EmprunteurPage';

describe('EmprunteurPage', () => {
  it('should render the list of available books and borrowed books', () => {
    render(<EmprunteurPage />);

    expect(screen.getByText('Livre 1')).toBeInTheDocument();
    expect(screen.getByText('Livre 2')).toBeInTheDocument();
    expect(screen.getByText('Livre 3')).toBeInTheDocument();

    expect(screen.queryByText(/Rendre/)).not.toBeInTheDocument();
  });

  it('should allow borrowing a book', () => {
    render(<EmprunteurPage />);

    const borrowButton = screen.getAllByText('Emprunter')[0];

    fireEvent.click(borrowButton);

    expect(screen.queryByText('Livre 1')).not.toBeInTheDocument();

    expect(screen.getByText('Livre 1')).toBeInTheDocument();
    expect(screen.getByText('Rendre')).toBeInTheDocument();
  });

  it('should allow returning a borrowed book', () => {
    render(<EmprunteurPage />);

    const borrowButton = screen.getAllByText('Emprunter')[0];
    fireEvent.click(borrowButton);

    const returnButton = screen.getByText('Rendre');

    fireEvent.click(returnButton);

    expect(screen.getByText('Livre 1')).toBeInTheDocument();

    expect(screen.queryByText('Rendre')).not.toBeInTheDocument();
  });

  it('should not allow borrowing a book that is not available', () => {
    render(<EmprunteurPage />);

    expect(screen.queryByText('Livre 2')).not.toHaveTextContent('Emprunter');
  });
});
