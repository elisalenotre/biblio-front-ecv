import { render, screen, fireEvent } from '@testing-library/react';
import BibliothecairePage from './BibliothecairePage';

describe('BibliothecairePage', () => {
  it('should render the list of books', () => {
    render(<BibliothecairePage />);

    expect(screen.getByText('Livre 1')).toBeInTheDocument();
    expect(screen.getByText('Livre 2')).toBeInTheDocument();
    expect(screen.getByText('Livre 3')).toBeInTheDocument();
  });

  it('should add a new book to the list', () => {
    render(<BibliothecairePage />);

    const input = screen.getByPlaceholderText('Nom du livre');
    const button = screen.getByText('Ajouter');

    fireEvent.change(input, { target: { value: 'Livre 4' } });
    fireEvent.click(button);

    expect(screen.getByText('Livre 4')).toBeInTheDocument();
  });

  it('should delete a book from the list', () => {
    render(<BibliothecairePage />);

    const deleteButton = screen.getAllByText('Supprimer')[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Livre 1')).not.toBeInTheDocument();
  });
});
