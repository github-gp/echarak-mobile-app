'use client';

import { ArrowLeft, Send, Phone, Video, Search, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const conversations = [
  {
    id: '1',
    name: 'Himalayan Herbs Co.',
    role: 'Seller',
    lastMessage: 'Yes, we can deliver by next week',
    timestamp: '2 hours ago',
    unread: 2,
    avatar: '🌿',
    online: true,
  },
  {
    id: '2',
    name: 'Ayurvedic Manufacturers Ltd.',
    role: 'Buyer',
    lastMessage: 'Can you provide sample before bulk order?',
    timestamp: '5 hours ago',
    unread: 0,
    avatar: '🏭',
    online: false,
  },
  {
    id: '3',
    name: 'Quality Testing Lab',
    role: 'Service Provider',
    lastMessage: 'Test report is ready for download',
    timestamp: '1 day ago',
    unread: 1,
    avatar: '🔬',
    online: true,
  },
  {
    id: '4',
    name: 'Organic Farms India',
    role: 'Seller',
    lastMessage: 'Thank you for the order!',
    timestamp: '2 days ago',
    unread: 0,
    avatar: '🌱',
    online: false,
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">Messages</h1>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => router.push(`/messages/${conv.id}`)}
            className="bg-white p-4 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center text-2xl">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{conv.name}</h3>
                    <p className="text-xs text-slate-500">{conv.role}</p>
                  </div>
                  <span className="text-xs text-slate-500">{conv.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${conv.unread > 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <div className="ml-2 w-5 h-5 bg-brand-primary text-white text-xs rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 right-4">
        <button className="w-14 h-14 bg-brand-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
