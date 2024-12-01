import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import BookList from './BookList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookList', () => {
    const books = [
        { id: '1', title: 'Book One', author: 'Author One', available: true },
        { id: '2', title: 'Book Two', author: 'Author Two', available: false },
    ];

    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: books });
    });

    test('renders book list', async () => {
        render(<BookList />);

        const bookOne = await screen.findByText('Book One by Author One - Available');
        const bookTwo = await screen.findByText('Book Two by Author Two - Borrowed');

        expect(bookOne).toBeInTheDocument();
        expect(bookTwo).toBeInTheDocument();
    });

    test('borrows a book', async () => {
        mockedAxios.post.mockResolvedValue({});

        render(<BookList />);

        const borrowButton = await screen.findByText('Borrow');
        fireEvent.click(borrowButton);

        const borrowedBook = await screen.findByText('Book One by Author One - Borrowed');
        expect(borrowedBook).toBeInTheDocument();
    });

    test('returns a book', async () => {
        mockedAxios.post.mockResolvedValue({});

        render(<BookList />);

        const returnButton = await screen.findByText('Return');
        fireEvent.click(returnButton);

        const availableBook = await screen.findByText('Book Two by Author Two - Available');
        expect(availableBook).toBeInTheDocument();
    });

    test('handles API errors gracefully', async () => {
        mockedAxios.get.mockRejectedValue(new Error('API Error'));

        render(<BookList />);

        const errorMessage = await screen.findByText('Error loading books');
        expect(errorMessage).toBeInTheDocument();
    });
});