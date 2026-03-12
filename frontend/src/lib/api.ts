import axios from 'axios';
import { Snippet, CreateSnippetInput, UpdateSnippetInput, PaginatedResponse } from '@/types/snippet';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const snippetApi = {
  getAll: async (params?: {
    q?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Snippet>> => {
    const response = await api.get('/snippets', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Snippet> => {
    const response = await api.get(`/snippets/${id}`);
    return response.data;
  },

  create: async (data: CreateSnippetInput): Promise<Snippet> => {
    const response = await api.post('/snippets', data);
    return response.data;
  },

  update: async (id: string, data: UpdateSnippetInput): Promise<Snippet> => {
    const response = await api.put(`/snippets/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/snippets/${id}`);
  },

  getTags: async (): Promise<string[]> => {
    const response = await api.get('/snippets/tags');
    return response.data;
  },
};

