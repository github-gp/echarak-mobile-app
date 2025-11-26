'use client';

import { ArrowLeft, MessageCircle, Phone, Mail, Bot, Send, Mic, Paperclip, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const quickQuestions = [
  '🌿 How to register as a seller?',
  '📋 What documents are required?',
  '💰 How does payment work?',
  '🚚 How to track my order?',
  '✅ How to get quality certification?',
  '📤 What is export process?',
];

const helplineContacts = [
  {
    type: 'NMPB General Helpline',
    number: '1800-11-6565',
    timing: '9:00 AM - 6:00 PM (Mon-Fri)',
    icon: '📞',
  },
  {
    type: 'Farmer Support',
    number: '1800-180-1551',
    timing: '24x7 Available',
    icon: '🌾',
  },
  {
    type: 'Quality Certification',
    number: '1800-111-2345',
    timing: '10:00 AM - 5:00 PM (Mon-Fri)',
    icon: '✅',
  },
  {
    type: 'Export Support',
    number: '1800-111-3456',
    timing: '9:00 AM - 6:00 PM (Mon-Fri)',
    icon: '📤',
  },
];

const aiResponses: Record<string, string> = {
  'register': 'To register as a seller: 1) Go to Profile → Complete KYC, 2) Upload GST & business documents, 3) Add product listings, 4) Wait for verification (24-48 hours).',
  'documents': 'Required documents: 1) GST Certificate, 2) Business registration, 3) Bank account details, 4) Identity proof (Aadhaar/PAN), 5) Address proof.',
  'payment': 'Payments are processed via escrow: 1) Buyer pays to eCharak, 2) Order ships, 3) Buyer confirms delivery, 4) Payment released to seller within 2-3 business days.',
  'track': 'To track your order: Go to Orders → Click on Order ID → View real-time FarEye tracking with GPS location and estimated delivery.',
  'certification': 'Quality certification: 1) Upload product samples, 2) Lab testing (3-5 days), 3) Certification issued, 4) Digital certificate on your profile.',
  'export': 'Export process: 1) Go to Export Support, 2) Select country, 3) Download required documents, 4) Get phytosanitary certificate, 5) Customs clearance support.',
};

export default function HelplinePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'chat' | 'phone' | 'email'>('chat');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! 👋 I\'m NMPB Assistant. How can I help you today?', time: 'Just now' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: 'Just now',
    };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let response = 'I can help you with that! Please contact our support team for detailed assistance.';
      
      // Simple keyword matching
      const query = inputMessage.toLowerCase();
      if (query.includes('register') || query.includes('signup')) {
        response = aiResponses.register;
      } else if (query.includes('document')) {
        response = aiResponses.documents;
      } else if (query.includes('payment') || query.includes('pay')) {
        response = aiResponses.payment;
      } else if (query.includes('track') || query.includes('order')) {
        response = aiResponses.track;
      } else if (query.includes('certif') || query.includes('quality')) {
        response = aiResponses.certification;
      } else if (query.includes('export')) {
        response = aiResponses.export;
      }

      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: response,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-900">NMPB Helpline</h1>
            <p className="text-xs text-slate-600">Get instant support</p>
          </div>
          <HelpCircle className="w-6 h-6 text-blue-700" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'chat'
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-slate-600'
            }`}
          >
            <Bot className="w-5 h-5 inline mr-1" />
            AI Chat
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'phone'
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-slate-600'
            }`}
          >
            <Phone className="w-5 h-5 inline mr-1" />
            Call
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'email'
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-slate-600'
            }`}
          >
            <Mail className="w-5 h-5 inline mr-1" />
            Email
          </button>
        </div>
      </div>

      {/* AI Chat Tab */}
      {activeTab === 'chat' && (
        <>
          {/* Quick Questions */}
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <p className="text-xs font-semibold text-slate-700 mb-2">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1.5 bg-white text-slate-700 text-xs rounded-full border border-slate-200 hover:border-blue-700 hover:bg-blue-50 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${
                  message.sender === 'user'
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-slate-900 border border-slate-200'
                } rounded-lg p-3 shadow-sm`}>
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-blue-700" />
                      <span className="text-xs font-semibold text-blue-700">NMPB Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Paperclip className="w-5 h-5 text-slate-600" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent text-slate-900"
              />
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Mic className="w-5 h-5 text-slate-600" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Phone Tab */}
      {activeTab === 'phone' && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-lg p-6 mb-4 text-center">
            <Phone className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">Need Immediate Help?</h2>
            <p className="text-sm text-blue-100">Our support team is ready to assist you</p>
          </div>

          <div className="space-y-3">
            {helplineContacts.map((contact, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{contact.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{contact.type}</h3>
                    <a href={`tel:${contact.number}`} className="text-blue-700 font-bold text-lg mb-1 block hover:underline">
                      {contact.number}
                    </a>
                    <p className="text-xs text-slate-600">⏰ {contact.timing}</p>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-900 text-sm mb-2">📞 Call Charges</h3>
            <p className="text-xs text-slate-700">All helpline numbers are toll-free. No charges apply.</p>
          </div>
        </div>
      )}

      {/* Email Tab */}
      {activeTab === 'email' && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white rounded-lg p-6 mb-4 text-center">
            <Mail className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">Email Support</h2>
            <p className="text-sm text-green-100">We typically respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 mb-4">
            <h3 className="font-semibold text-slate-900 mb-3">Contact Emails</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-1">General Inquiries</p>
                <a href="mailto:support@echarak.gov.in" className="text-blue-700 text-sm hover:underline">
                  support@echarak.gov.in
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-1">Farmer Support</p>
                <a href="mailto:farmers@echarak.gov.in" className="text-blue-700 text-sm hover:underline">
                  farmers@echarak.gov.in
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-1">Technical Issues</p>
                <a href="mailto:tech@echarak.gov.in" className="text-blue-700 text-sm hover:underline">
                  tech@echarak.gov.in
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-1">Export Queries</p>
                <a href="mailto:export@echarak.gov.in" className="text-blue-700 text-sm hover:underline">
                  export@echarak.gov.in
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">Quick Email Form</h3>
            <form className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Your Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 text-slate-900"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Subject</label>
                <input
                  type="text"
                  placeholder="Brief subject"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 text-slate-900"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue or question..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 text-slate-900"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
