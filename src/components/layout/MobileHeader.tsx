'use client';

import { APP_CONFIG } from '@/lib/constants';
import { Menu, ShoppingCart, Bell } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cartContext';

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { cartCount } = useCart();

  const handleNavigation = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>

          {/* Logo/Brand */}
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold text-brand-primary">
              {APP_CONFIG.name}
            </h1>
            <p className="text-xs text-slate-600">Powered by FarEye</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-slate-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => router.push('/cart')}
              className="p-2 hover:bg-slate-100 rounded-lg relative"
            >
              <ShoppingCart className="w-6 h-6 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search medicinal plants..."
            onClick={() => router.push('/search')}
            readOnly
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer bg-white text-slate-900"
          />
        </div>
      </header>

      {/* Slide-out Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg p-6 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-brand-primary">Menu</h2>
              <p className="text-xs text-slate-600 mt-1">eCharak 2.0</p>
            </div>
            
            <nav className="space-y-4">
              <button 
                onClick={() => handleNavigation('/')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                🏠 Home
              </button>
              <button 
                onClick={() => handleNavigation('/search')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                🔍 Search Products
              </button>
              <button 
                onClick={() => handleNavigation('/wishlist')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                ❤️ My Wishlist
              </button>
              <button 
                onClick={() => handleNavigation('/compare?ids=1,2')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                ⚖️ Compare Products
              </button>
              <button 
                onClick={() => handleNavigation('/bulk-calculator')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                🧮 Bulk Calculator
              </button>
              <button 
                onClick={() => handleNavigation('/orders')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                📦 My Orders
              </button>
              <button 
                onClick={() => handleNavigation('/track-order/ECH2024001234')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                🚚 Track Shipment
              </button>
              <button 
                onClick={() => handleNavigation('/warehouse')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                🏭 Warehouse Network
              </button>
              <button 
                onClick={() => handleNavigation('/seller-dashboard')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                📊 Seller Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/quality-verification')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                ✅ Quality Certification
              </button>
              <button 
                onClick={() => handleNavigation('/market-intelligence')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                📈 Market Intelligence
              </button>
              <button 
                onClick={() => handleNavigation('/analytics')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                📊 Analytics Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/profile')} 
                className="block w-full text-left py-2 text-slate-700 hover:text-brand-primary transition-colors font-medium"
              >
                👤 Profile
              </button>
            </nav>

            {/* FarEye Branding in Menu - Government Colors */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-4 text-white text-center shadow-md">
                <p className="text-xs font-semibold mb-1">Powered by</p>
                <p className="text-lg font-bold">FarEye</p>
                <p className="text-xs text-blue-100 mt-1">Logistics Intelligence</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
