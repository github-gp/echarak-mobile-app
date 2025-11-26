'use client';

import { ArrowLeft, Search, MapPin, Phone, Mail, ExternalLink, Filter, Building2, Users, Leaf, Factory } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const stakeholderCategories = [
  { id: 'all', label: 'All', icon: Users, count: 1245 },
  { id: 'farmers', label: 'Farmers/Collectors', icon: Leaf, count: 890 },
  { id: 'buyers', label: 'Buyers/Traders', icon: Building2, count: 156 },
  { id: 'processors', label: 'Processors', icon: Factory, count: 89 },
  { id: 'exporters', label: 'Exporters', icon: ExternalLink, count: 67 },
  { id: 'labs', label: 'Testing Labs', icon: Building2, count: 43 },
];

const stakeholders = [
  {
    id: 1,
    name: 'Himalayan Herbs Co.',
    type: 'Farmer/Collector',
    location: 'Uttarakhand',
    state: 'Uttarakhand',
    specialization: 'High-altitude medicinal plants',
    products: ['Ashwagandha', 'Brahmi', 'Shatavari'],
    verified: true,
    rating: 4.8,
    phone: '+91-9876543210',
    email: 'contact@himalayanherbs.in',
    gstin: '05XXXXX1234X1Z5',
    established: '2015',
  },
  {
    id: 2,
    name: 'Ayurvedic Manufacturers Ltd.',
    type: 'Buyer/Manufacturer',
    location: 'Gujarat',
    state: 'Gujarat',
    specialization: 'Bulk procurement for Ayurvedic formulations',
    products: ['Turmeric', 'Amla', 'Giloy'],
    verified: true,
    rating: 4.6,
    phone: '+91-9876543211',
    email: 'procurement@ayurmfg.com',
    gstin: '24XXXXX5678X1Z5',
    established: '2008',
  },
  {
    id: 3,
    name: 'Organic Farms India',
    type: 'Farmer/Collector',
    location: 'Karnataka',
    state: 'Karnataka',
    specialization: 'Organic certified medicinal plants',
    products: ['Tulsi', 'Neem', 'Aloe Vera'],
    verified: true,
    rating: 4.9,
    phone: '+91-9876543212',
    email: 'info@organicfarmsindia.com',
    gstin: '29XXXXX9012X1Z5',
    established: '2012',
  },
  {
    id: 4,
    name: 'Quality Testing Labs Pvt Ltd',
    type: 'Testing Lab',
    location: 'Maharashtra',
    state: 'Maharashtra',
    specialization: 'NABL accredited testing for medicinal plants',
    products: ['Heavy metals', 'Pesticide residue', 'Microbial testing'],
    verified: true,
    rating: 4.7,
    phone: '+91-9876543213',
    email: 'lab@qualitytest.in',
    gstin: '27XXXXX3456X1Z5',
    established: '2010',
  },
  {
    id: 5,
    name: 'Global Botanicals Exports',
    type: 'Exporter',
    location: 'Tamil Nadu',
    state: 'Tamil Nadu',
    specialization: 'Export to US, EU, Middle East',
    products: ['Moringa', 'Ashwagandha', 'Turmeric'],
    verified: true,
    rating: 4.5,
    phone: '+91-9876543214',
    email: 'exports@globalbotanicals.com',
    gstin: '33XXXXX7890X1Z5',
    established: '2007',
  },
];

const states = ['All States', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Gujarat', 'Uttarakhand', 'Andhra Pradesh', 'Kerala'];

export default function DirectoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('All States');
  const [showFilters, setShowFilters] = useState(false);

  const filteredStakeholders = stakeholders.filter((stakeholder) => {
    const matchesSearch =
      stakeholder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stakeholder.products.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === 'all' ||
      stakeholder.type.toLowerCase().includes(selectedCategory);
    const matchesState =
      selectedState === 'All States' || stakeholder.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-900">MAP Stakeholder Directory</h1>
            <p className="text-xs text-slate-600">1,245 verified stakeholders</p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="p-2 hover:bg-slate-100 rounded-lg">
            <Filter className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, product, location..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
            />
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="px-4 pb-3 space-y-3 bg-slate-50 border-t">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary text-slate-900"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">🌿 Find Verified Stakeholders</h2>
        <p className="text-sm text-green-100">
          Connect with farmers, buyers, processors, and exporters in the medicinal plants ecosystem
        </p>
      </div>

      {/* Category Tabs */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3">
          <div className="grid grid-cols-2 gap-2">
            {stakeholderCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-green-700 bg-green-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                ategory.icon
                  className={`w-5 h-5 ${selectedCategory === category.id ? 'text-green-700' : 'text-slate-600'}`}
                />
                <div className="text-left">
                  <p className={`text-sm font-semibold ${selectedCategory === category.id ? 'text-green-900' : 'text-slate-900'}`}>
                    {category.label}
                  </p>
                  <p className="text-xs text-slate-600">{category.count}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-slate-600">{filteredStakeholders.length} results</p>
          <button className="text-sm text-blue-700 font-medium">Sort by Rating</button>
        </div>

        <div className="space-y-3">
          {filteredStakeholders.map((stakeholder) => (
            <div
              key={stakeholder.id}
              onClick={() => router.push(`/directory/${stakeholder.id}`)}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:border-green-700 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        {stakeholder.name}
                        {stakeholder.verified && <span className="text-green-600 text-xs">✓ Verified</span>}
                      </h3>
                      <p className="text-xs text-slate-600">{stakeholder.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-600">
                        <span className="text-sm font-semibold">⭐ {stakeholder.rating}</span>
                      </div>
                      <p className="text-xs text-slate-500">Est. {stakeholder.established}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-slate-700 mb-2">{stakeholder.specialization}</p>
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{stakeholder.location}</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold text-slate-700 mb-1">Products/Services:</p>
                <div className="flex flex-wrap gap-1">
                  {stakeholder.products.map((product, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <a href={`tel:${stakeholder.phone}`} className="flex items-center gap-1 text-blue-700 text-xs hover:underline">
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <a href={`mailto:${stakeholder.email}`} className="flex items-center gap-1 text-blue-700 text-xs hover:underline">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>
                <button className="flex items-center gap-1 text-blue-700 text-xs hover:underline ml-auto">
                  <span>View Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStakeholders.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium mb-2">No stakeholders found</p>
            <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
