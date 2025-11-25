'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

export default function ComparePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Compare Products</h1>
        </div>
      </div>
      
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700 mb-4">Product comparison coming soon</p>
          <Button onClick={() => router.push('/search')}>Browse Products</Button>
        </div>
      </div>
    </div>
  );
}
