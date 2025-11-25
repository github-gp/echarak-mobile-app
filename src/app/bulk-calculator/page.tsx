'use client';

import { useState } from 'react';
import { ArrowLeft, Calculator, TrendingDown, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

// Discount tiers
const discountTiers = [
  { minQty: 0, maxQty: 49, discount: 0, label: 'Standard Price' },
  { minQty: 50, maxQty: 99, discount: 5, label: 'Small Bulk' },
  { minQty: 100, maxQty: 249, discount: 10, label: 'Medium Bulk' },
  { minQty: 250, maxQty: 499, discount: 15, label: 'Large Bulk' },
  { minQty: 500, maxQty: Infinity, discount: 20, label: 'Wholesale' },
];

const sampleProductsCalc = [
  { id: '1', name: 'Ashwagandha Powder', basePrice: 450, unit: 'kg' },
  { id: '2', name: 'Tulsi Leaves', basePrice: 320, unit: 'kg' },
  { id: '3', name: 'Turmeric Powder', basePrice: 280, unit: 'kg' },
];

export default function BulkCalculatorPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(sampleProductsCalc[0]);
  const [quantity, setQuantity] = useState(100);

  const getCurrentTier = () => {
    return discountTiers.find(
      tier => quantity >= tier.minQty && quantity <= tier.maxQty
    ) || discountTiers[0];
  };

  const tier = getCurrentTier();
  const subtotal = selectedProduct.basePrice * quantity;
  const discountAmount = subtotal * (tier.discount / 100);
  const finalPrice = subtotal - discountAmount;
  const pricePerUnit = finalPrice / quantity;
  const savings = discountAmount;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Bulk Discount Calculator</h1>
            <p className="text-xs text-gray-500">Calculate savings on bulk orders</p>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8" />
          <div>
            <p className="font-bold text-lg">Smart Bulk Pricing</p>
            <p className="text-sm opacity-90">Save up to 20% on wholesale orders</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Product Selection */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">Select Product</h3>
          <div className="space-y-2">
            {sampleProductsCalc.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedProduct.id === product.id
                    ? 'border-brand-primary bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">Base: {formatCurrency(product.basePrice)}/{product.unit}</p>
                  </div>
                  {selectedProduct.id === product.id && (
                    <span className="text-brand-primary">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Input */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">Enter Quantity</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(10, quantity - 10))}
              className="w-12 h-12 border-2 border-brand-primary rounded-lg font-bold text-xl hover:bg-orange-50"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary"
            />
            <button
              onClick={() => setQuantity(quantity + 10)}
              className="w-12 h-12 border-2 border-brand-primary rounded-lg font-bold text-xl hover:bg-orange-50"
            >
              +
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">{selectedProduct.unit}</p>
        </div>

        {/* Current Tier */}
        <div className="bg-gradient-to-r from-brand-primary to-orange-600 text-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm opacity-90">Current Discount Tier</p>
              <p className="text-2xl font-bold">{tier.label}</p>
            </div>
            <Badge variant="success" className="bg-white text-green-700 text-lg px-4 py-2">
              {tier.discount}% OFF
            </Badge>
          </div>
          {tier.maxQty !== Infinity && (
            <p className="text-xs opacity-75">
              Order {tier.maxQty + 1} {selectedProduct.unit} to unlock {discountTiers[discountTiers.indexOf(tier) + 1]?.discount}% discount
            </p>
          )}
        </div>

        {/* Discount Tiers */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">Discount Tiers</h3>
          <div className="space-y-2">
            {discountTiers.map((t, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  t.discount === tier.discount
                    ? 'border-brand-primary bg-orange-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{t.label}</p>
                    <p className="text-xs text-gray-600">
                      {t.minQty} - {t.maxQty === Infinity ? '∞' : t.maxQty} {selectedProduct.unit}
                    </p>
                  </div>
                  <Badge variant={t.discount === tier.discount ? 'primary' : 'secondary'}>
                    {t.discount}% OFF
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">Price Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">{formatCurrency(selectedProduct.basePrice)} × {quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                Discount ({tier.discount}%)
              </span>
              <span className="font-medium text-green-600">-{formatCurrency(discountAmount)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold text-lg">Final Price</span>
              <div className="text-right">
                <p className="font-bold text-2xl text-brand-primary">{formatCurrency(finalPrice)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(pricePerUnit)}/{selectedProduct.unit}</p>
              </div>
            </div>
            {savings > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-sm font-semibold text-green-700">
                  🎉 You save {formatCurrency(savings)}!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={() => router.push(`/product/${selectedProduct.id}`)}
        >
          <Package className="w-5 h-5 mr-2" />
          View Product Details
        </Button>
      </div>
    </div>
  );
}

