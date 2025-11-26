'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/lib/roleContext';
import BuyerDashboard from '@/components/dashboards/BuyerDashboard';
import FarmerDashboard from '@/components/dashboards/FarmerDashboard';
import GovernmentDashboard from '@/components/dashboards/GovernmentDashboard';
import MobileHeader from '@/components/layout/MobileHeader';

export default function HomePage() {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.push('/role-selection');
    }
  }, [role, router]);

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <MobileHeader />
      {role === 'buyer' && <BuyerDashboard />}
      {role === 'farmer' && <FarmerDashboard />}
      {role === 'government' && <GovernmentDashboard />}
    </>
  );
}
