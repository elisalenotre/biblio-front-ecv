import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

export const fetchBooks = async () => {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
};

export const addBook = async (title: string, author: string) => {
    const response = await axios.post(`${BASE_URL}/books`, { title, author });
    return response.data;
};

export const deleteBook = async (id: number) => {
    await axios.delete(`${BASE_URL}/books/${id}`);
};

export const updateBookStatus = async (id: number, status: string) => {
    const response = await axios.patch(`${BASE_URL}/books/${id}`, { status });
    return response.data;
};
