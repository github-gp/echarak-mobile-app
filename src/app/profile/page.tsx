'use client';

import { sampleUser, sampleOrders } from '@/data/sampleProducts';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, User, MapPin, Phone, Mail, Building, FileText, Package, ChevronRight, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';

export default function ProfilePage() {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'primary'> = {
      delivered: 'success',
      in_transit: 'warning',
      pending: 'primary',
    };
    return variants[status] || 'secondary';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">My Profile</h1>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-brand-primary to-orange-600 p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-brand-primary text-3xl font-bold">
            {sampleUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold">{sampleUser.name}</h2>
            <p className="text-sm opacity-90">{sampleUser.company}</p>
            <Badge variant="success" className="mt-2 bg-white text-green-700">
              Verified {sampleUser.role}
            </Badge>
          </div>
        </div>
        <p className="text-sm opacity-90">Member since {formatDate(sampleUser.joinedDate)}</p>
      </div>

      {/* Contact Information */}
      <div className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{sampleUser.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{sampleUser.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Building className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{sampleUser.company}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FileText className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">GST: {sampleUser.gstNumber}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Delivery Address</h3>
          <button className="text-sm text-brand-primary font-medium">Edit</button>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700 space-y-1">
            <p>{sampleUser.address.line1}</p>
            <p>{sampleUser.address.line2}</p>
            <p>{sampleUser.address.city}, {sampleUser.address.state}</p>
            <p>{sampleUser.address.pincode}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Recent Orders</h3>
          <button className="text-sm text-brand-primary font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-brand-primary cursor-pointer transition-colors"
              onClick={() => router.push(`/track-order/${order.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Order #{order.id}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>{formatDate(order.date)}</span>
                <span>{order.items} items</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-brand-primary">{formatCurrency(order.total)}</span>
                <Badge variant={getStatusBadge(order.status)}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm">Seller Dashboard</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm">Quality Certifications</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm">Payment History</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm">Settings</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="mx-4 mt-4 mb-4">
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
