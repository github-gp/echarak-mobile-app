'use client';

import { APP_CONFIG } from '@/lib/constants';
import { Menu, ShoppingCart, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cartContext';
import { useRole } from '@/lib/roleContext';
import Badge from '../common/Badge';

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { cartCount } = useCart();
  const { role, clearRole } = useRole();

  const handleNavigation = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    clearRole();
    setMenuOpen(false);
    router.push('/role-selection');
  };

  const getRoleLabel = () => {
    if (role === 'farmer') return 'Farmer/Seller';
    if (role === 'buyer') return 'Buyer/Trader';
    if (role === 'government') return 'Government';
    return 'User';
  };

  const getRoleColor = () => {
    if (role === 'farmer') return 'success';
    if (role === 'buyer') return 'primary';
    if (role === 'government') return 'warning';
    return 'secondary';
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>

          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold text-brand-primary">{APP_CONFIG.name}</h1>
            {role && (
              <Badge variant={getRoleColor() as any} className="text-xs px-2 py-0.5">
                {getRoleLabel()}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-slate-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {role === 'buyer' && (
              <button onClick={() => router.push('/cart')} className="p-2 hover:bg-slate-100 rounded-lg relative">
                <ShoppingCart className="w-6 h-6 text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {role === 'buyer' && (
          <div className="px-4 pb-3">
            <input
              type="text"
              placeholder="Search medicinal plants..."
              onClick={() => router.push('/search')}
              readOnly
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer bg-white text-slate-900"
            />
          </div>
        )}
      </header>

      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-brand-primary">Menu</h2>
                <p className="text-xs text-slate-600 mt-1">{getRoleLabel()}</p>
              </div>
              
              <nav className="space-y-3">
                <button onClick={() => handleNavigation('/')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                  🏠 Home
                </button>

                {role === 'buyer' && (
                  <>
                    <button onClick={() => handleNavigation('/search')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      🔍 Search Products
                    </button>
                    <button onClick={() => handleNavigation('/wishlist')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      ❤️ My Wishlist
                    </button>
                    <button onClick={() => handleNavigation('/compare?ids=1,2')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      ⚖️ Compare Products
                    </button>
                    <button onClick={() => handleNavigation('/bulk-calculator')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      🧮 Bulk Calculator
                    </button>
                    <button onClick={() => handleNavigation('/rfq')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      📋 Request for Quote
                    </button>
                    <button onClick={() => handleNavigation('/analytics/buyer')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      📊 My Analytics
                    </button>
                  </>
                )}

                {role === 'farmer' && (
                  <>
                    <button onClick={() => handleNavigation('/seller-dashboard')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      📊 Seller Dashboard
                    </button>
                    <button onClick={() => handleNavigation('/rfq/marketplace')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      📋 RFQ Marketplace
                    </button>
                    <button onClick={() => handleNavigation('/rfq/my-bids')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      💼 My Bids
                    </button>
                    <button onClick={() => handleNavigation('/farmer-programs')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      🎓 Training Programs
                    </button>
                    <button onClick={() => handleNavigation('/analytics/farmer')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      📈 My Analytics
                    </button>
                  </>
                )}

                {role === 'government' && (
                  <>
                    <button onClick={() => handleNavigation('/analytics/government')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      📊 Analytics Dashboard
                    </button>
                    <button onClick={() => handleNavigation('/quality-verification')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      ✅ Quality Verification
                    </button>
                    <button onClick={() => handleNavigation('/market-intelligence')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                      📈 Market Intelligence
                    </button>
                  </>
                )}

                <button onClick={() => handleNavigation('/knowledge-base')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                  📚 Knowledge Base
                </button>
                <button onClick={() => handleNavigation('/orders')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                  📦 My Orders
                </button>
                <button onClick={() => handleNavigation('/track-order/ECH2024001234')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                  🚚 Track Shipment
                </button>
                <button onClick={() => handleNavigation('/warehouse')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                  🏭 Warehouse Network
                </button>
                <button onClick={() => handleNavigation('/profile')} className="block w-full text-left py-2.5 px-3 text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition-colors font-medium rounded-lg">
                  👤 Profile
                </button>
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium">
                  <LogOut className="w-5 h-5" />
                  <span>Switch Role / Logout</span>
                </button>
              </div>

              <div className="mt-4">
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-4 text-white text-center shadow-md">
                  <p className="text-xs font-semibold mb-1">Powered by</p>
                  <p className="text-lg font-bold">FarEye</p>
                  <p className="text-xs text-blue-100 mt-1">Logistics Intelligence</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
