'use client';

import { ArrowLeft, Send, Phone, Video, MoreVertical, Paperclip } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

const messages = [
  {
    id: '1',
    sender: 'them',
    text: 'Hello! I am interested in your Ashwagandha powder. Can you tell me more about the quality?',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'me',
    text: 'Hi! Our Ashwagandha is Grade A, organic certified with >2.5% withanolides. We have lab test reports available.',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    sender: 'them',
    text: 'Great! What is your minimum order quantity and delivery time?',
    timestamp: '10:35 AM',
  },
  {
    id: '4',
    sender: 'me',
    text: 'Minimum order is 50kg. We can deliver within 5-7 days to your location.',
    timestamp: '10:37 AM',
  },
  {
    id: '5',
    sender: 'them',
    text: 'Can you provide sample before bulk order?',
    timestamp: '10:40 AM',
  },
];

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const [message, setMessage] = useState('');

  const contact = {
    name: 'Himalayan Herbs Co.',
    role: 'Verified Seller',
    online: true,
    avatar: '🌿',
  };

  const handleSend = () => {
    if (message.trim()) {
      // Handle message send
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center text-xl">
                {contact.avatar}
              </div>
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 text-sm">{contact.name}</h2>
              <p className="text-xs text-green-600">{contact.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Phone className="w-5 h-5 text-slate-700" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Video className="w-5 h-5 text-slate-700" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] ${msg.sender === 'me' ? 'bg-brand-primary text-white' : 'bg-white text-slate-900 border border-slate-200'} rounded-lg p-3 shadow-sm`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-slate-500'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <Paperclip className="w-5 h-5 text-slate-600" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-3 bg-brand-primary text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
