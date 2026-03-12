'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { snippetApi } from '@/lib/api';
import { Snippet, SnippetType } from '@/types/snippet';
import SnippetCard from '@/components/SnippetCard';
import SnippetForm from '@/components/SnippetForm';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: any = { page, limit };
      if (searchQuery) params.q = searchQuery;
      if (selectedTag) params.tag = selectedTag;

      const response = await snippetApi.getAll(params);
      setSnippets(response.data);
      setTotalPages(response.meta.totalPages);
      setTotal(response.meta.total);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch snippets');
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const tags = await snippetApi.getTags();
      setAllTags(tags);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [page, searchQuery, selectedTag]);

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreateSnippet = async (data: {
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
  }) => {
    try {
      await snippetApi.create(data);
      setShowForm(false);
      setPage(1);
      fetchSnippets();
      fetchTags();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create snippet');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this snippet?')) return;

    try {
      await snippetApi.delete(id);
      fetchSnippets();
      fetchTags();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Failed to delete snippet');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Snippet Vault</span>
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? 'Cancel' : '+ New Snippet'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Form */}
        {showForm && (
          <div className="mb-8">
            <SnippetForm
              onSubmit={handleCreateSnippet}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            allTags={allTags}
            selectedTag={selectedTag}
            onTagSelect={handleTagFilter}
          />
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-4 text-sm text-gray-600">
            Found {total} snippet{total !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedTag && ` with tag "${selectedTag}"`}
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Empty State */}
        {!loading && !error && snippets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No snippets found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedTag
                ? 'Try adjusting your search or filter'
                : 'Get started by creating your first snippet'}
            </p>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="btn btn-primary">
                Create First Snippet
              </button>
            )}
          </div>
        )}

        {/* Snippets Grid */}
        {!loading && !error && snippets.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {snippets.map((snippet) => (
                <SnippetCard
                  key={snippet._id}
                  snippet={snippet}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

