import Link from 'next/link';
import { Snippet } from '@/types/snippet';

interface SnippetCardProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
}

export default function SnippetCard({ snippet, onDelete }: SnippetCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'link':
        return 'bg-blue-100 text-blue-800';
      case 'command':
        return 'bg-green-100 text-green-800';
      case 'note':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(snippet.type)}`}>
          {snippet.type}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(snippet._id);
          }}
          className="text-gray-400 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <Link href={`/snippets/${snippet._id}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
          {snippet.title}
        </h3>
      </Link>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {snippet.content}
      </p>

      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {snippet.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              #{tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500">
        {new Date(snippet.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

