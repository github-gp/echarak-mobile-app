'use client';

import { ArrowLeft, Globe, FileText, Ship, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

const exportServices = [
  {
    id: 'documentation',
    title: 'Export Documentation',
    icon: '📄',
    description: 'Get help with all export paperwork and certificates',
    features: ['Phytosanitary Certificate', 'Certificate of Origin', 'Export License', 'Invoice & Packing List'],
  },
  {
    id: 'customs',
    title: 'Customs Compliance',
    icon: '✅',
    description: 'Navigate customs requirements for different countries',
    features: ['HS Code Classification', 'Duty & Tariff Calculator', 'Import Regulations', 'Restricted Items List'],
  },
  {
    id: 'standards',
    title: 'Quality Standards',
    icon: '⭐',
    description: 'Meet international quality and safety standards',
    features: ['EU Regulations', 'US FDA Requirements', 'WHO Standards', 'Organic Certification'],
  },
  {
    id: 'logistics',
    title: 'Shipping & Logistics',
    icon: '🚢',
    description: 'International shipping solutions and freight forwarding',
    features: ['Freight Quotes', 'Cold Chain Support', 'Insurance Options', 'Tracking Support'],
  },
];

const exportResources = [
  { title: 'Export Guide for Medicinal Plants', type: 'PDF', size: '2.4 MB', icon: '📕' },
  { title: 'Country-wise Requirements', type: 'Excel', size: '890 KB', icon: '📊' },
  { title: 'Sample Export Documents', type: 'ZIP', size: '1.2 MB', icon: '📦' },
  { title: 'Quality Standards Checklist', type: 'PDF', size: '456 KB', icon: '✓' },
];

const targetCountries = [
  { name: 'United States', demand: 'High', icon: '🇺🇸', avgDuty: '0-5%' },
  { name: 'European Union', demand: 'High', icon: '🇪🇺', avgDuty: '3-7%' },
  { name: 'Japan', demand: 'Medium', icon: '🇯🇵', avgDuty: '5-10%' },
  { name: 'UAE', demand: 'High', icon: '🇦🇪', avgDuty: '0-5%' },
  { name: 'Australia', demand: 'Medium', icon: '🇦🇺', avgDuty: '0-5%' },
];

export default function ExportSupportPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Export Support</h1>
            <p className="text-xs text-slate-600">Go Global with eCharak</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-6">
        <h2 className="text-xl font-bold mb-2">🌏 Export Your Products Globally</h2>
        <p className="text-sm text-indigo-100">Comprehensive support for international trade</p>
      </div>

      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-start gap-3">
          <Globe className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-1">💡 Why Export?</h3>
            <p className="text-xs text-slate-700">
              India exported ₹12,000+ crores worth of medicinal plants in 2024. Tap into global demand with proper documentation and quality standards.
            </p>
          </div>
        </div>

        <h3 className="font-semibold text-slate-900 mb-3">Export Services</h3>
        <div className="space-y-3 mb-6">
          {exportServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:border-indigo-600 transition-colors cursor-pointer"
              onClick={() => router.push(`/export-support/${service.id}`)}
            >
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">{service.title}</h4>
                  <p className="text-sm text-slate-600">{service.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-slate-900 mb-3">Target Export Markets</h3>
        <div className="space-y-2 mb-6">
          {targetCountries.map((country, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{country.icon}</span>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{country.name}</h4>
                  <p className="text-xs text-slate-600">Avg Duty: {country.avgDuty}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                country.demand === 'High' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {country.demand} Demand
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-slate-900 mb-3">Download Resources</h3>
        <div className="space-y-2 mb-6">
          {exportResources.map((resource, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{resource.icon}</span>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{resource.title}</h4>
                  <p className="text-xs text-slate-500">{resource.type} • {resource.size}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Download className="w-5 h-5 text-brand-primary" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg p-6 text-white text-center">
          <Ship className="w-12 h-12 mx-auto mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-2">Ready to Export?</h3>
          <p className="text-sm text-purple-100 mb-4">
            Get personalized export assistance from our trade specialists
          </p>
          <Button variant="outline" className="bg-white text-purple-700 border-white hover:bg-purple-50">
            <ExternalLink className="w-4 h-4 mr-2" />
            Contact Export Team
          </Button>
        </div>
      </div>
    </div>
  );
}
