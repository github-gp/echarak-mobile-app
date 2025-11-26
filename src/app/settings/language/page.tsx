'use client';

import { ArrowLeft, Check, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
];

export default function LanguageSettingsPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('echarak_language');
    if (saved) setSelectedLanguage(saved);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('echarak_language', langCode);
    
    // Trigger Google Translate
    if (typeof window !== 'undefined' && (window as any).translateTo) {
      (window as any).translateTo(langCode);
    }
    
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Select Language</h1>
            <p className="text-xs text-slate-600">Choose your preferred language</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-start gap-3">
          <Globe className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-1">Multi-language Support</h3>
            <p className="text-xs text-slate-700">
              eCharak supports 7 Indian languages. The entire app will be translated automatically.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                selectedLanguage === lang.code
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{lang.flag}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900">{lang.name}</h3>
                  <p className="text-sm text-slate-600">{lang.nativeName}</p>
                </div>
              </div>
              {selectedLanguage === lang.code && (
                <Check className="w-6 h-6 text-blue-700" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 text-sm mb-2">ℹ️ Note</h3>
          <p className="text-xs text-slate-700">
            Language change applies to the entire app. Refresh the page if translation doesn't apply immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
