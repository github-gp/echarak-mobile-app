'use client';

import { ArrowLeft, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';
import { formatCurrency } from '@/lib/utils';

const myBids = [
  {
    id: 'BID-001',
    rfqId: 'RFQ-2024-001',
    product: 'Ashwagandha Root Powder',
    buyer: 'Ayurvedic Manufacturers Ltd.',
    myPrice: 410,
    quantity: 5000,
    unit: 'kg',
    status: 'pending',
    submittedDate: '2 hours ago',
    totalBids: 12,
  },
  {
    id: 'BID-002',
    rfqId: 'RFQ-2024-002',
    product: 'Turmeric Powder',
    buyer: 'Herbal Exports India',
    myPrice: 265,
    quantity: 3000,
    unit: 'kg',
    status: 'accepted',
    submittedDate: '2 days ago',
    totalBids: 8,
    buyerNote: 'Great quote! We would like to proceed with your offer.',
  },
  {
    id: 'BID-003',
    rfqId: 'RFQ-2024-004',
    product: 'Brahmi Leaves',
    buyer: 'Wellness Products Co.',
    myPrice: 380,
    quantity: 1200,
    unit: 'kg',
    status: 'rejected',
    submittedDate: '5 days ago',
    totalBids: 15,
    buyerNote: 'Thank you for your quote. We selected a supplier with faster delivery.',
  },
];

export default function MyBidsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">My Bids</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
            <p className="text-2xl font-bold text-slate-900">{myBids.length}</p>
            <p className="text-xs text-slate-600">Total Bids</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
            <p className="text-2xl font-bold text-amber-600">{myBids.filter(b => b.status === 'pending').length}</p>
            <p className="text-xs text-slate-600">Pending</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
            <p className="text-2xl font-bold text-green-600">{myBids.filter(b => b.status === 'accepted').length}</p>
            <p className="text-xs text-slate-600">Won</p>
          </div>
        </div>

        <div className="space-y-3">
          {myBids.map((bid) => (
            <div key={bid.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-500">{bid.rfqId}</span>
                      {bid.status === 'pending' && <Badge variant="warning">Pending Review</Badge>}
                      {bid.status === 'accepted' && <Badge variant="success">Won</Badge>}
                      {bid.status === 'rejected' && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
                          Not Selected
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-base mb-1">{bid.product}</h3>
                    <p className="text-sm text-slate-600">to {bid.buyer}</p>
                  </div>
                  {bid.status === 'accepted' && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {bid.status === 'rejected' && <XCircle className="w-6 h-6 text-red-600" />}
                  {bid.status === 'pending' && <Clock className="w-6 h-6 text-amber-600" />}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Your Quote</p>
                    <p className="font-bold text-brand-primary">{formatCurrency(bid.myPrice)}/{bid.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Quantity</p>
                    <p className="font-medium text-slate-900">{bid.quantity.toLocaleString()} {bid.unit}</p>
                  </div>
                </div>

                {bid.buyerNote && (
                  <div className={`rounded-lg p-3 mb-3 ${bid.status === 'accepted' ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
                    <p className="text-xs font-medium text-slate-700 mb-1">Buyer Response:</p>
                    <p className="text-sm text-slate-800">{bid.buyerNote}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Submitted {bid.submittedDate}</span>
                  <span>{bid.totalBids} total bids</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
