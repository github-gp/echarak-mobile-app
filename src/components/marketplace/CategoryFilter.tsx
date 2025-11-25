'use client';

import { useState } from 'react';

const categories = [
  { id: 'all', label: 'All', icon: '🌿' },
  { id: 'herbs', label: 'Herbs', icon: '🌱' },
  { id: 'roots', label: 'Roots', icon: '🥕' },
  { id: 'spices', label: 'Spices', icon: '🌶️' },
  { id: 'seeds', label: 'Seeds', icon: '🌰' },
];

export default function CategoryFilter() {
  const [active, setActive] = useState('all');

  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-2 p-4 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActive(category.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              active === category.id
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-xs font-medium">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
