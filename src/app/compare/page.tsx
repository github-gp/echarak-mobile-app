'use client';

import { ArrowLeft, Plus, X, CheckCircle, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sampleProducts } from '@/data/sampleProducts';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get product IDs from URL query params (e.g., /compare?ids=1,2,3)
  const productIds = searchParams.get('ids')?.split(',') || ['1', '2'];
  const products = productIds.map(id => sampleProducts.find(p => p.id === id)).filter(Boolean);

  const comparisonFields = [
    { label: 'Price', key: 'price', format: (val: number) => `${formatCurrency(val)}/kg` },
    { label: 'Grade', key: 'grade' },
    { label: 'Rating', key: 'rating', format: (val: number) => `${val} ⭐` },
    { label: 'Location', key: 'location' },
    { label: 'Min Order', key: 'minOrder', format: (val: number, unit: string) => `${val} ${unit}` },
    { label: 'Availability', key: 'availability', format: (val: number, unit: string) => `${val} ${unit}` },
    { label: 'Active Compounds', key: 'activeCompounds' },
    { label: 'Shelf Life', key: 'shelfLife' },
    { label: 'In Stock', key: 'inStock', format: (val: boolean) => val ? '✓' : '✗' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Compare Products</h1>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-b border-blue-200 p-4">
        <p className="text-sm text-gray-700">
          📊 Compare up to 3 products side-by-side to make informed purchasing decisions
        </p>
      </div>

      {/* Comparison Table */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-white z-10">
                  Feature
                </th>
                {products.map((product: any) => (
                  <th key={product.id} className="p-3 min-w-[200px]">
                    <div className="relative">
                      {/* Product Card */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-3xl">🌿</span>
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{product.seller}</p>
                        <div className="flex flex-wrap justify-center gap-1 mb-2">
                          {product.certifications.map((cert: string) => (
                            <Badge key={cert} variant="success" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field, idx) => (
                <tr key={idx} className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="p-3 text-sm font-medium text-gray-700 sticky left-0 bg-inherit z-10">
                    {field.label}
                  </td>
                  {products.map((product: any) => {
                    let value = product[field.key as keyof typeof product];
                    if (field.format) {
                      value = field.format(value, product.unit);
                    }
                    
                    return (
                      <td key={product.id} className="p-3 text-sm text-center">
                        {field.key === 'inStock' ? (
                          product.inStock ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                          )
                        ) : (
                          <span className="font-medium">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {products.map((product: any) => (
            <Button
              key={product.id}
              variant="primary"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              View {product.name.split(' ')[0]}
            </Button>
          ))}
        </div>

        {/* Add More Products */}
        {products.length < 3 && (
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => router.push('/search')}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Product
          </Button>
        )}
      </div>
    </div>
  );
}
