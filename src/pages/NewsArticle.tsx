import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Flame, Droplets, Bookmark } from 'lucide-react';
import { getBlogPostById } from '../data/blogPosts';

export const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getBlogPostById(id) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow p-6 text-center space-y-3">
          <h1 className="text-xl font-bold text-gray-900">Article not found</h1>
          <p className="text-gray-600">This article may have been moved or removed.</p>
          <Link to="/news" className="text-primary-600 hover:text-primary-700 font-semibold">
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  // Minimal markdown-to-HTML formatting for headers and paragraphs
  const formattedContent = post.content
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('### '))
        return `<h4 class="text-base font-semibold text-gray-900 mt-4 mb-2">${trimmed.slice(4)}</h4>`;
      if (trimmed.startsWith('## '))
        return `<h3 class="text-lg font-bold text-gray-900 mt-4 mb-2">${trimmed.slice(3)}</h3>`;
      if (trimmed.startsWith('# '))
        return `<h2 class="text-xl font-bold text-gray-900 mt-5 mb-3">${trimmed.slice(2)}</h2>`;
      if (trimmed.startsWith('- '))
        return `<ul class="list-disc pl-5 text-gray-700 mb-3"><li>${trimmed.slice(2)}</li></ul>`;
      return `<p class="text-gray-700 leading-relaxed mb-3">${trimmed}</p>`;
    })
    .join('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/news" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
              <span className="text-lg font-semibold">Back to News</span>
            </Link>
            <div className="flex items-center gap-2 text-sm">
              {post.featured && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20">
                  <Flame size={14} />
                  Featured
                </span>
              )}
              {post.category === 'weather' && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20">
                  <Droplets size={14} />
                  Weather
                </span>
              )}
              <span className="px-2 py-1 rounded-full bg-white/20">
                {post.category.toUpperCase()}
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 leading-tight">{post.title}</h1>
          <p className="text-indigo-100 text-sm">
            {new Date(post.date).toLocaleDateString()} • {post.author}
          </p>
          <p className="text-indigo-100 text-sm mt-2">
            Reading this article can inform your prediction probabilities.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-50 text-primary-700 rounded-full">
              <Bookmark size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Use insights in predictions</h3>
              <p className="text-sm text-gray-600">
                Apply this article’s insights when evaluating related markets.
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Go to Markets
          </Link>
        </div>
      </div>
    </div>
  );
};


