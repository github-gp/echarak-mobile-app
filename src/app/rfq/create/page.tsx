'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

export default function CreateRFQPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    unit: 'kg',
    targetPrice: '',
    specifications: '',
    deliveryDate: '',
    deliveryLocation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate RFQ creation
    setTimeout(() => {
      alert('RFQ Created Successfully! Suppliers will be notified.');
      router.push('/rfq');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Create New RFQ</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block mb-2">
            <span className="text-sm font-medium text-slate-700">Product Name *</span>
            <input
              type="text"
              required
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              placeholder="e.g., Ashwagandha Root Powder"
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </label>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block mb-2">
            <span className="text-sm font-medium text-slate-700">Quantity Required *</span>
            <div className="flex gap-2">
              <input
                type="number"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="5000"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="quintal">quintal</option>
              </select>
            </div>
          </label>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block mb-2">
            <span className="text-sm font-medium text-slate-700">Target Price (per kg)</span>
            <input
              type="number"
              value={formData.targetPrice}
              onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
              placeholder="420"
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </label>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block mb-2">
            <span className="text-sm font-medium text-slate-700">Specifications *</span>
            <textarea
              required
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              placeholder="Grade A, Organic Certified, Withanolides >2.5%"
              rows={4}
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </label>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block mb-2">
            <span className="text-sm font-medium text-slate-700">Required Delivery Date *</span>
            <input
              type="date"
              required
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </label>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block mb-2">
            <span className="text-sm font-medium text-slate-700">Delivery Location *</span>
            <input
              type="text"
              required
              value={formData.deliveryLocation}
              onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
              placeholder="Bengaluru, Karnataka"
              className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </label>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm">📢 What happens next?</h3>
          <ul className="text-xs text-slate-700 space-y-1">
            <li>• Your RFQ will be sent to verified suppliers</li>
            <li>• Suppliers will submit competitive quotes</li>
            <li>• You can compare and select the best offer</li>
            <li>• Direct negotiation with selected suppliers</li>
          </ul>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          <Package className="w-5 h-5 mr-2" />
          Submit RFQ
        </Button>
      </form>
    </div>
  );
}
