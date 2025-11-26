'use client';

import { useRouter } from 'next/navigation';
import { useRole, UserRole } from '@/lib/roleContext';
import { Shield } from 'lucide-react';

const roles = [
  {
    id: 'farmer' as UserRole,
    title: 'Farmer/Seller',
    description: 'List products, manage inventory, track sales and deliveries',
    icon: '🌾',
    color: 'from-emerald-600 to-green-700',
    features: ['Product Management', 'Order Dashboard', 'Revenue Analytics', 'FarEye Shipping'],
  },
  {
    id: 'buyer' as UserRole,
    title: 'Buyer/Trader',
    description: 'Purchase products, track orders, manage suppliers and procurement',
    icon: '🏪',
    color: 'from-blue-600 to-indigo-700',
    features: ['Product Search', 'Bulk Ordering', 'Supplier Management', 'Live Tracking'],
  },
  {
    id: 'government' as UserRole,
    title: 'NMPB/Government',
    description: 'Market oversight, compliance monitoring, policy insights and analytics',
    icon: '🏛️',
    color: 'from-purple-600 to-pink-700',
    features: ['Market Analytics', 'Compliance Reports', 'State-wise Data', 'Policy Dashboard'],
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const { setRole } = useRole();

  const handleRoleSelect = (roleId: UserRole) => {
    setRole(roleId);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-4xl">🌿</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome to eCharak 2.0</h1>
          <p className="text-lg text-slate-600 mb-2">India's Medicinal Plants Marketplace</p>
          <p className="text-sm text-slate-500">Powered by FarEye Technologies Pvt Ltd</p>
        </div>

        <div className="mb-6">
          <h2 className="text-center text-xl font-semibold text-slate-800 mb-4">Select Your Role to Continue</h2>
          <p className="text-center text-sm text-slate-600 mb-8">Choose how you'll be using the platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500 active:scale-95"
            >
              <div className={`bg-gradient-to-r ${role.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-3">{role.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-slate-600 mb-4 min-h-[3rem]">{role.description}</p>
                <div className="space-y-2 mb-4">
                  {role.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-center gap-2 text-blue-700 font-semibold group-hover:text-blue-900 transition-colors">
                    <span>Select Role</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-800 mb-2">
            <Shield className="w-5 h-5" />
            <p className="font-semibold">Role-Based Access</p>
          </div>
          <p className="text-sm text-slate-600">
            Your dashboard and features will be customized based on your selected role. You can change your role anytime from settings.
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Ministry of AYUSH | National Medicinal Plants Board</p>
          <p className="mt-1">Government of India Initiative</p>
        </div>
      </div>
    </div>
  );
}
