import MobileHeader from '@/components/layout/MobileHeader';
import BottomNav from '@/components/layout/BottomNav';
import CategoryFilter from '@/components/marketplace/CategoryFilter';
import ProductGrid from '@/components/marketplace/ProductGrid';
import { sampleProducts } from '@/data/sampleProducts';
import { TrendingUp, Truck, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-orange-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">India's Premier</h2>
        <h3 className="text-xl mb-3">Medicinal Plants Marketplace</h3>
        <p className="text-sm opacity-90">Connecting farmers, traders & manufacturers</p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-3 p-4 -mt-6">
        <div className="bg-white rounded-lg shadow-md p-3 text-center">
          <Truck className="w-6 h-6 text-brand-primary mx-auto mb-1" />
          <p className="text-xs font-medium text-gray-700">FarEye Tracking</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-3 text-center">
          <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-xs font-medium text-gray-700">Quality Certified</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-3 text-center">
          <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <p className="text-xs font-medium text-gray-700">Live Pricing</p>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter />

      {/* Products Section */}
      <div className="p-4 pt-2">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Premium Medicinal Plants
        </h3>
      </div>

      {/* Product Grid */}
      <ProductGrid products={sampleProducts} />

      <BottomNav />
    </div>
  );
}
