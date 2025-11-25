'use client';

import { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductGrid from '@/components/marketplace/ProductGrid';
import { sampleProducts } from '@/data/sampleProducts';
import Badge from '@/components/common/Badge';

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    certification: [] as string[],
    grade: [] as string[],
    location: [] as string[],
  });

  const filters = {
    certifications: ['Organic', 'AYUSH Certified', 'ISO 9001', 'GMP Certified'],
    grades: ['Premium', 'Grade A', 'Grade B'],
    locations: ['Rajasthan', 'Kerala', 'Uttarakhand', 'Karnataka', 'Maharashtra'],
  };

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({ certification: [], grade: [], location: [] });
  };

  const activeFiltersCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Search */}
      <div className="sticky top-0 z-50 bg-white shadow-sm pb-3">
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicinal plants..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              autoFocus
            />
          </div>
        </div>

        {/* Filter Button */}
        <div className="px-4 flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="primary" className="ml-1">{activeFiltersCount}</Badge>
            )}
          </button>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="px-4 mt-2 flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([category, values]) =>
              values.map(value => (
                <Badge key={`${category}-${value}`} variant="primary" className="pr-1">
                  {value}
                  <button
                    onClick={() => toggleFilter(category as keyof typeof selectedFilters, value)}
                    className="ml-1 hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-4">
          {/* Certifications */}
          <div className="mb-4">
            <h3 className="font-semibold text-sm mb-2">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {filters.certifications.map(cert => (
                <button
                  key={cert}
                  onClick={() => toggleFilter('certification', cert)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedFilters.certification.includes(cert)
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
          </div>

          {/* Grade */}
          <div className="mb-4">
            <h3 className="font-semibold text-sm mb-2">Quality Grade</h3>
            <div className="flex flex-wrap gap-2">
              {filters.grades.map(grade => (
                <button
                  key={grade}
                  onClick={() => toggleFilter('grade', grade)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedFilters.grade.includes(grade)
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Location</h3>
            <div className="flex flex-wrap gap-2">
              {filters.locations.map(location => (
                <button
                  key={location}
                  onClick={() => toggleFilter('location', location)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedFilters.location.includes(location)
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{sampleProducts.length}</span> results
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={sampleProducts} />
    </div>
  );
}
