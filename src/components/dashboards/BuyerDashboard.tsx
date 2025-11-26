'use client';

import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Heart, FileText, TrendingUp, Package, MessageSquare, Globe } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';

const quickActions = [
  { icon: Search, label: 'Search Products', path: '/search', color: 'from-blue-500 to-blue-700' },
  { icon: FileText, label: 'Request RFQ', path: '/rfq/create', color: 'from-purple-500 to-purple-700' },
  { icon: Package, label: 'Bulk Calculator', path: '/bulk-calculator', color: 'from-green-500 to-green-700' },
  { icon: MessageSquare, label: 'Messages', path: '/messages', color: 'from-pink-500 to-pink-700' },
];

const featuredProducts = [
  { id: 1, name: 'Ashwagandha Root', price: 320, unit: 'kg', seller: 'Himalayan Herbs', rating: 4.7, stock: 500 },
  { id: 2, name: 'Tulsi Leaves', price: 280, unit: 'kg', seller: 'Organic Farms', rating: 4.8, stock: 300 },
  { id: 3, name: 'Turmeric Powder', price: 180, unit: 'kg', seller: 'Golden Spices', rating: 4.6, stock: 800 },
];

const recentOrders = [
  { id: 'ECH001234', product: 'Ashwagandha Powder', status: 'In Transit', date: '2 days ago' },
  { id: 'ECH001235', product: 'Brahmi Extract', status: 'Delivered', date: '5 days ago' },
];

export default function BuyerDashboard() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-6 pb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back! 🙏</h1>
        <p className="text-blue-100 text-sm mb-4">Find the best medicinal plants at competitive prices</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <ShoppingCart className="w-5 h-5 mb-1 text-blue-200" />
            <p className="text-2xl font-bold">{cartCount}</p>
            <p className="text-xs text-blue-200">In Cart</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <Heart className="w-5 h-5 mb-1 text-pink-300" />
            <p className="text-2xl font-bold">{wishlistCount}</p>
            <p className="text-xs text-blue-200">Wishlist</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <Package className="w-5 h-5 mb-1 text-green-300" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-blue-200">Active Orders</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-700" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => router.push(action.path)}
                className={`bg-gradient-to-br ${action.color} text-white rounded-lg p-4 hover:shadow-lg transition-all active:scale-95`}
              >
                <action.icon className="w-6 h-6 mb-2" />
                <p className="text-sm font-semibold">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">Featured Products</h2>
          <button onClick={() => router.push('/search')} className="text-sm text-blue-700 font-medium">
            View All →
          </button>
        </div>
        <div className="space-y-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:border-blue-700 transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🌿</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-slate-600 mb-2">{product.seller}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-blue-700">{formatCurrency(product.price)}/{product.unit}</p>
                      <p className="text-xs text-slate-500">⭐ {product.rating} • Stock: {product.stock} kg</p>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-700 text-white text-sm rounded-lg font-medium hover:bg-blue-800">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">Recent Orders</h2>
          <button onClick={() => router.push('/orders')} className="text-sm text-blue-700 font-medium">
            View All →
          </button>
        </div>
        <div className="space-y-2">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/track-order/${order.id}`)}
              className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 cursor-pointer hover:border-blue-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{order.product}</p>
                  <p className="text-xs text-slate-600">Order #{order.id}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{order.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Support Banner */}
      <div className="px-4 mb-6">
        <div
          onClick={() => router.push('/export-support')}
          className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Go Global! 🌍</h3>
              <p className="text-sm text-purple-100">Export support for international trade</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
