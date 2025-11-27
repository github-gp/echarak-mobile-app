'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { formatCurrency } from '@/lib/utils';

const myRFQs = [
  {
    id: 'RFQ-2024-001',
    product: 'Ashwagandha Root Powder',
    quantity: '5000 kg',
    targetPrice: 420,
    status: 'active',
    quotesReceived: 12,
    expiresIn: '3 days',
    specifications: 'Grade A, Organic Certified, Withanolides >2.5%',
  },
  {
    id: 'RFQ-2024-002',
    product: 'Turmeric Powder',
    quantity: '3000 kg',
    targetPrice: 280,
    status: 'closed',
    quotesReceived: 8,
    bestQuote: 265,
    specifications: 'Grade A, Curcumin >3%',
  },
  {
    id: 'RFQ-2024-003',
    product: 'Tulsi Leaves (Dried)',
    quantity: '1500 kg',
    targetPrice: 320,
    status: 'active',
    quotesReceived: 5,
    expiresIn: '5 days',
    specifications: 'Organic, Clean, No stems',
  },
];

export default function RFQPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');

  const filteredRFQs = myRFQs.filter(rfq => rfq.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Request for Quote (RFQ)</h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6">
        <h2 className="text-xl font-bold mb-2">B2B Procurement</h2>
        <p className="text-sm text-blue-100">Get competitive quotes from verified suppliers</p>
      </div>

      <div className="p-4">
        <Button variant="primary" className="w-full mb-4" onClick={() => router.push('/rfq/create')}>
          <Plus className="w-5 h-5 mr-2" />
          Create New RFQ
        </Button>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-brand-primary text-white'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Active ({myRFQs.filter(r => r.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'closed'
                ? 'bg-brand-primary text-white'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Closed ({myRFQs.filter(r => r.status === 'closed').length})
          </button>
        </div>

        <div className="space-y-3">
          {filteredRFQs.map((rfq) => (
            <div
              key={rfq.id}
              onClick={() => router.push(`/rfq/${rfq.id}`)}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 cursor-pointer hover:border-brand-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-700">{rfq.id}</span>
                    <Badge variant={rfq.status === 'active' ? 'success' : 'secondary'}>
                      {rfq.status.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{rfq.product}</h3>
                  <p className="text-sm text-slate-700">Quantity: {rfq.quantity}</p>
                </div>
                <FileText className="w-5 h-5 text-brand-primary" />
              </div>

              <div className="bg-slate-50 rounded-lg p-3 mb-3">
                <p className="text-xs text-slate-700 mb-1">Specifications:</p>
                <p className="text-sm text-slate-800">{rfq.specifications}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-700">Target Price</p>
                    <p className="font-bold text-brand-primary">{formatCurrency(rfq.targetPrice)}/kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-700">Quotes Received</p>
                    <p className="font-bold text-slate-900">{rfq.quotesReceived}</p>
                  </div>
                </div>
                {rfq.status === 'active' && rfq.expiresIn && (
                  <div className="flex items-center gap-1 text-amber-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">{rfq.expiresIn}</span>
                  </div>
                )}
                {rfq.status === 'closed' && rfq.bestQuote && (
                  <div className="text-right">
                    <p className="text-xs text-slate-700">Best Quote</p>
                    <p className="font-bold text-green-600">{formatCurrency(rfq.bestQuote)}/kg</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRFQs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-700">No {activeTab} RFQs</p>
          </div>
        )}
      </div>
    </div>
  );
}
