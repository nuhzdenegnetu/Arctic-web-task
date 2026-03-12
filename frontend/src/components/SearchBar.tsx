'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  allTags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export default function SearchBar({ onSearch, allTags, selectedTag, onTagSelect }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div className="card">
      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            className="input pl-10"
            placeholder="Search snippets..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Filter by tag:</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTagSelect(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

