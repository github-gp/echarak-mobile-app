'use client';

import { ArrowLeft, BookOpen, Video, Users, Award, TrendingUp, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Badge from '@/components/common/Badge';

const programs = [
  {
    id: '1',
    title: 'Organic Cultivation Certification',
    category: 'Certification',
    duration: '6 months',
    status: 'active',
    participants: 2450,
    description: 'Learn organic farming practices and get certified for premium pricing',
    icon: '🌱',
  },
  {
    id: '2',
    title: 'Modern Irrigation Techniques',
    category: 'Training',
    duration: '2 weeks',
    status: 'upcoming',
    participants: 890,
    description: 'Water-efficient drip and sprinkler irrigation for medicinal plants',
    icon: '💧',
  },
  {
    id: '3',
    title: 'Post-Harvest Processing',
    category: 'Skill Development',
    duration: '4 weeks',
    status: 'active',
    participants: 1200,
    description: 'Drying, storage, and quality preservation techniques',
    icon: '📦',
  },
  {
    id: '4',
    title: 'Government Scheme Benefits',
    category: 'Financial Aid',
    duration: 'Self-paced',
    status: 'active',
    participants: 5600,
    description: 'Access subsidies, loans, and grants for medicinal plant cultivation',
    icon: '💰',
  },
];

const upcomingWebinars = [
  { title: 'Pest Management in Ashwagandha', date: '28 Nov 2024', time: '3:00 PM', expert: 'Dr. Sharma' },
  { title: 'Market Price Trends 2025', date: '30 Nov 2024', time: '4:00 PM', expert: 'Mr. Patel' },
];

export default function FarmerProgramsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Farmer Programs</h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-700 to-green-800 text-white p-6">
        <h2 className="text-xl font-bold mb-2">Farmer Empowerment</h2>
        <p className="text-sm text-emerald-100">Training, certification, and financial support programs</p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 -mt-6">
        <div className="bg-white rounded-lg shadow-md p-3 text-center border border-slate-200">
          <BookOpen className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-slate-900">24</p>
          <p className="text-xs text-slate-600">Active Programs</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-3 text-center border border-slate-200">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-slate-900">12,450</p>
          <p className="text-xs text-slate-600">Enrolled Farmers</p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-3">Featured Programs</h3>
        <div className="space-y-3">
          {programs.map((program) => (
            <div
              key={program.id}
              onClick={() => router.push(`/farmer-programs/${program.id}`)}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 cursor-pointer hover:border-emerald-600 transition-colors"
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{program.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-slate-900 text-sm">{program.title}</h4>
                    <Badge variant={program.status === 'active' ? 'success' : 'warning'}>
                      {program.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{program.description}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {program.participants.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Video className="w-5 h-5 text-brand-primary" />
          Upcoming Webinars
        </h3>
        <div className="space-y-2">
          {upcomingWebinars.map((webinar, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-slate-900">{webinar.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">By {webinar.expert}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-brand-primary">{webinar.date}</p>
                  <p className="text-xs text-slate-500">{webinar.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
