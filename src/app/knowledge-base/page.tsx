'use client';

import { ArrowLeft, Search, BookOpen, FileText, Video, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const categories = [
  { id: 'plants', name: 'Plant Monographs', count: 520, icon: '🌿' },
  { id: 'cultivation', name: 'Cultivation Guides', count: 145, icon: '🌱' },
  { id: 'research', name: 'Research Papers', count: 890, icon: '📊' },
  { id: 'regulations', name: 'Regulations & Standards', count: 67, icon: '📋' },
];

const featuredArticles = [
  {
    id: '1',
    title: 'Complete Guide to Ashwagandha Cultivation',
    category: 'Cultivation',
    readTime: '12 min',
    views: 4500,
    thumbnail: '🌾',
  },
  {
    id: '2',
    title: 'WHO Quality Standards for Medicinal Plants',
    category: 'Standards',
    readTime: '8 min',
    views: 3200,
    thumbnail: '✅',
  },
  {
    id: '3',
    title: 'Organic Certification Process in India',
    category: 'Certification',
    readTime: '15 min',
    views: 2800,
    thumbnail: '📜',
  },
];

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Knowledge Base</h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6">
        <h2 className="text-xl font-bold mb-2">Research & Resources</h2>
        <p className="text-sm text-purple-100">Comprehensive medicinal plants knowledge repository</p>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, plants, research..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <h3 className="font-semibold text-slate-900 mb-3">Browse by Category</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => router.push(`/knowledge-base/${category.id}`)}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 cursor-pointer hover:border-brand-primary transition-colors"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h4 className="font-semibold text-sm text-slate-900 mb-1">{category.name}</h4>
              <p className="text-xs text-slate-500">{category.count} resources</p>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-slate-900 mb-3">Featured Articles</h3>
        <div className="space-y-3">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => router.push(`/knowledge-base/article/${article.id}`)}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 cursor-pointer hover:border-brand-primary transition-colors"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{article.thumbnail}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">{article.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm flex items-center gap-2">
            <Award className="w-5 h-5" />
            Expert Contributors
          </h3>
          <p className="text-xs text-slate-700 mb-2">
            All content is reviewed by certified experts from AYUSH, NMPB, and leading research institutions.
          </p>
          <p className="text-xs font-medium text-brand-primary">1,200+ verified articles • Updated daily</p>
        </div>
      </div>
    </div>
  );
}
