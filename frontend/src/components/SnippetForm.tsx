'use client';

import { useState } from 'react';
import { SnippetType } from '@/types/snippet';

interface SnippetFormProps {
  initialData?: {
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
  };
  onSubmit: (data: {
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function SnippetForm({ initialData, onSubmit, onCancel }: SnippetFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    tags: initialData?.tags?.join(', ') || '',
    type: initialData?.type || SnippetType.NOTE,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length > 5000) {
      newErrors.content = 'Content must be less than 5000 characters';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await onSubmit({
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags,
        type: formData.type,
      });
    } catch (err) {
      const error = err as Error;
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {errors.submit}
        </div>
      )}

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          className={`input ${errors.title ? 'border-red-500' : ''}`}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter snippet title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Type */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type <span className="text-red-500">*</span>
        </label>
        <select
          id="type"
          className={`input ${errors.type ? 'border-red-500' : ''}`}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as SnippetType })}
        >
          <option value={SnippetType.NOTE}>Note</option>
          <option value={SnippetType.COMMAND}>Command</option>
          <option value={SnippetType.LINK}>Link</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
      </div>

      {/* Content */}
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          rows={6}
          className={`input ${errors.content ? 'border-red-500' : ''}`}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Enter snippet content"
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          className="input"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="javascript, react, tutorial"
        />
        <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : initialData ? 'Update Snippet' : 'Create Snippet'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

