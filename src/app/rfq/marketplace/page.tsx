'use client';

import { ArrowLeft, TrendingUp, Clock, Package, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import { formatCurrency } from '@/lib/utils';

const openRFQs = [
  {
    id: 'RFQ-2024-001',
    buyer: 'Ayurvedic Manufacturers Ltd.',
    product: 'Ashwagandha Root Powder',
    quantity: 5000,
    unit: 'kg',
    targetPrice: 420,
    location: 'Bengaluru, Karnataka',
    expiresIn: '3 days',
    bidsReceived: 12,
    specifications: 'Grade A, Organic Certified, Withanolides >2.5%, No chemical treatment',
    deliveryDate: '15 Jan 2025',
    postedDate: '2 days ago',
  },
  {
    id: 'RFQ-2024-003',
    buyer: 'Herbal Exports India',
    product: 'Tulsi Leaves (Dried)',
    quantity: 1500,
    unit: 'kg',
    targetPrice: 320,
    location: 'Delhi NCR',
    expiresIn: '5 days',
    bidsReceived: 5,
    specifications: 'Organic, Clean, No stems, Moisture <10%',
    deliveryDate: '20 Jan 2025',
    postedDate: '1 day ago',
  },
  {
    id: 'RFQ-2024-005',
    buyer: 'Wellness Products Co.',
    product: 'Turmeric Rhizome',
    quantity: 3000,
    unit: 'kg',
    targetPrice: 280,
    location: 'Mumbai, Maharashtra',
    expiresIn: '7 days',
    bidsReceived: 8,
    specifications: 'Grade A, Curcumin >3%, Bright yellow color',
    deliveryDate: '25 Jan 2025',
    postedDate: '3 hours ago',
  },
  {
    id: 'RFQ-2024-007',
    buyer: 'Traditional Medicine Hub',
    product: 'Brahmi Powder',
    quantity: 800,
    unit: 'kg',
    targetPrice: 550,
    location: 'Pune, Maharashtra',
    expiresIn: '4 days',
    bidsReceived: 3,
    specifications: 'Organic, Fine powder, Bacosides >40%',
    deliveryDate: '18 Jan 2025',
    postedDate: '6 hours ago',
  },
];

export default function RFQMarketplacePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">RFQ Marketplace</h1>
            <p className="text-xs text-slate-700">Bid on buyer requirements</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-700 to-green-800 text-white p-6">
        <h2 className="text-xl font-bold mb-2">Available Opportunities</h2>
        <p className="text-sm text-emerald-100">Submit competitive quotes to win orders</p>
      </div>

      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-1">💡 Pro Tip</h3>
            <p className="text-xs text-slate-700">
              Submit competitive quotes early. Buyers often review bids as they come in. Include quality certifications to stand out!
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">{openRFQs.length} Open RFQs</h3>
          <button className="text-sm text-brand-primary font-medium">Filter</button>
        </div>

        <div className="space-y-3">
          {openRFQs.map((rfq) => (
            <div
              key={rfq.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:border-emerald-600 transition-colors"
            >
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-3 border-b border-emerald-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-700">{rfq.id}</span>
                      <Badge variant="success">{rfq.bidsReceived} bids</Badge>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{rfq.product}</h3>
                    <p className="text-sm text-slate-700">by {rfq.buyer}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 bg-white px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">{rfq.expiresIn}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-slate-700 mb-1">Quantity Required</p>
                    <p className="font-bold text-slate-900">{rfq.quantity.toLocaleString()} {rfq.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 mb-1">Target Price</p>
                    <p className="font-bold text-emerald-700">{formatCurrency(rfq.targetPrice)}/{rfq.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 mb-1">Delivery Location</p>
                    <p className="text-sm text-slate-900 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rfq.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 mb-1">Required By</p>
                    <p className="text-sm text-slate-900">{rfq.deliveryDate}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-slate-700 mb-1 font-medium">Specifications:</p>
                  <p className="text-sm text-slate-800">{rfq.specifications}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-700">Posted {rfq.postedDate}</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push(`/rfq/bid/${rfq.id}`)}
                  >
                    <Package className="w-4 h-4 mr-1" />
                    Submit Quote
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
