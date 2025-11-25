'use client';

import { APP_CONFIG } from '@/lib/constants';
import { Menu, ShoppingCart, Bell } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo/Brand */}
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold text-brand-primary">
              {APP_CONFIG.name}
            </h1>
            <p className="text-xs text-gray-500">Powered by FarEye</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => router.push('/cart')}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search medicinal plants..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
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
          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-brand-primary">Menu</h2>
            </div>
            <nav className="space-y-4">
              <button onClick={() => handleNavigation('/')} className="block w-full text-left py-2 text-gray-700 hover:text-brand-primary">
                Home
              </button>
              <button onClick={() => handleNavigation('/orders')} className="block w-full text-left py-2 text-gray-700 hover:text-brand-primary">
                My Orders
              </button>
              <button onClick={() => handleNavigation('/track-order/ECH2024001234')} className="block w-full text-left py-2 text-gray-700 hover:text-brand-primary">
                Track Shipment
              </button>
              <button onClick={() => handleNavigation('/warehouse')} className="block w-full text-left py-2 text-gray-700 hover:text-brand-primary">
                Warehouse Network
              </button>
              <button onClick={() => handleNavigation('#')} className="block w-full text-left py-2 text-gray-700 hover:text-brand-primary">
                Seller Dashboard
              </button>
              <button onClick={() => handleNavigation('#')} className="block w-full text-left py-2 text-gray-700 hover:text-brand-primary">
                Quality Certification
              </button>
              <button onClick={() => handleNavigation('/profile')} className="block w-full text-left py-2 text-gray-700 hover:text-brand-primary">
                Profile
              </button>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
