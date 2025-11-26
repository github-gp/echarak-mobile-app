'use client';

import { useState } from 'react';
import { ArrowLeft, Package, CheckCircle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/common/Button';
import { formatCurrency } from '@/lib/utils';

export default function SubmitBidPage() {
  const router = useRouter();
  const params = useParams();
  const rfqId = params.id;

  const [formData, setFormData] = useState({
    price: '',
    quantity: '',
    deliveryTime: '',
    notes: '',
    certifications: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);

  const rfqDetails = {
    id: rfqId,
    product: 'Ashwagandha Root Powder',
    buyer: 'Ayurvedic Manufacturers Ltd.',
    quantity: 5000,
    unit: 'kg',
    targetPrice: 420,
    specifications: 'Grade A, Organic Certified, Withanolides >2.5%',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/rfq/my-bids');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Quote Submitted!</h2>
          <p className="text-slate-600 mb-4">
            Your quote has been sent to {rfqDetails.buyer}. You'll be notified when they review it.
          </p>
          <p className="text-sm text-slate-500">Redirecting to your bids...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">Submit Quote</h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6">
        <h2 className="text-xl font-bold mb-2">{rfqDetails.product}</h2>
        <p className="text-sm text-blue-100">Buyer: {rfqDetails.buyer}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">RFQ Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Quantity Required</span>
              <span className="font-medium text-slate-900">{rfqDetails.quantity.toLocaleString()} {rfqDetails.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Target Price</span>
              <span className="font-medium text-emerald-700">{formatCurrency(rfqDetails.targetPrice)}/{rfqDetails.unit}</span>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-slate-600 mb-1">Specifications:</p>
              <p className="text-slate-800">{rfqDetails.specifications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Your Quote</h3>

          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700 mb-1 block">Your Price (per kg) *</span>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="400"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-1">Target price is {formatCurrency(rfqDetails.targetPrice)}/kg</p>
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700 mb-1 block">Quantity You Can Supply (kg) *</span>
            <input
              type="number"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="5000"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700 mb-1 block">Delivery Time (days) *</span>
            <input
              type="number"
              required
              value={formData.deliveryTime}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              placeholder="7"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700 mb-1 block">Your Certifications</span>
            <div className="space-y-2">
              {['Organic India', 'AYUSH Certified', 'ISO 22000', 'GMP Certified'].map((cert) => (
                <label key={cert} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.certifications.includes(cert)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, certifications: [...formData.certifications, cert] });
                      } else {
                        setFormData({ ...formData, certifications: formData.certifications.filter(c => c !== cert) });
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-slate-700">{cert}</span>
                </label>
              ))}
            </div>
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700 mb-1 block">Additional Notes</span>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information about quality, packaging, sample availability..."
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
            />
          </label>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 text-sm mb-2">📝 Quote Guidelines</h3>
          <ul className="text-xs text-slate-700 space-y-1">
            <li>• Be competitive but realistic with pricing</li>
            <li>• Highlight your quality certifications</li>
            <li>• Mention if you can provide samples</li>
            <li>• Ensure you can meet the delivery timeline</li>
          </ul>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          <Package className="w-5 h-5 mr-2" />
          Submit Quote
        </Button>
      </form>
    </div>
  );
}
