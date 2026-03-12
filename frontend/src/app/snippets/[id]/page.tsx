'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { snippetApi } from '@/lib/api';
import { Snippet, SnippetType } from '@/types/snippet';
import SnippetForm from '@/components/SnippetForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function SnippetDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSnippet();
  }, [params.id]);

  const fetchSnippet = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await snippetApi.getById(params.id);
      setSnippet(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch snippet');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: {
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
  }) => {
    try {
      await snippetApi.update(params.id, data);
      setIsEditing(false);
      fetchSnippet();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update snippet');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this snippet?')) return;

    try {
      await snippetApi.delete(params.id);
      router.push('/snippets');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Failed to delete snippet');
    }
  };

  const copyToClipboard = () => {
    if (snippet) {
      navigator.clipboard.writeText(snippet.content);
      alert('Content copied to clipboard!');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!snippet) return <ErrorMessage message="Snippet not found" />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/snippets" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Snippets</span>
            </Link>
            {!isEditing && (
              <div className="flex space-x-2">
                <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                  Edit
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEditing ? (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Edit Snippet</h2>
            <SnippetForm
              initialData={snippet}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="card">
            {/* Type Badge */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                snippet.type === 'link' ? 'bg-blue-100 text-blue-800' :
                snippet.type === 'command' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {snippet.type}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{snippet.title}</h1>

            {/* Tags */}
            {snippet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {snippet.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase">Content</h3>
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{snippet.content}</code>
              </pre>
            </div>

            {/* Metadata */}
            <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Created: {new Date(snippet.createdAt).toLocaleString()}</span>
                <span>Updated: {new Date(snippet.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

