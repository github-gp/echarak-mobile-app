'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    search: 'Search',
    cart: 'Cart',
    profile: 'Profile',
    orders: 'Orders',
    welcome: 'Welcome to eCharak',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    price: 'Price',
    quantity: 'Quantity',
  },
  hi: {
    home: 'होम',
    search: 'खोजें',
    cart: 'कार्ट',
    profile: 'प्रोफाइल',
    orders: 'ऑर्डर',
    welcome: 'eCharak में आपका स्वागत है',
    addToCart: 'कार्ट में जोड़ें',
    buyNow: 'अभी खरीदें',
    price: 'मूल्य',
    quantity: 'मात्रा',
  },
  ta: {
    home: 'முகப்பு',
    search: 'தேடு',
    cart: 'வண்டி',
    profile: 'சுயவிவரம்',
    orders: 'ஆர்டர்கள்',
    welcome: 'eCharak க்கு வரவேற்கிறோம்',
    addToCart: 'வண்டியில் சேர்',
    buyNow: 'இப்போது வாங்கு',
    price: 'விலை',
    quantity: 'அளவு',
  },
  te: {
    home: 'హోమ్',
    search: 'వెతకండి',
    cart: 'కార్ట్',
    profile: 'ప్రొఫైల్',
    orders: 'ఆర్డర్లు',
    welcome: 'eCharak కు స్వాగతం',
    addToCart: 'కార్ట్‌కు జోడించండి',
    buyNow: 'ఇప్పుడే కొనండి',
    price: 'ధర',
    quantity: 'పరిమాణం',
  },
  kn: {
    home: 'ಮುಖಪುಟ',
    search: 'ಹುಡುಕಿ',
    cart: 'ಕಾರ್ಟ್',
    profile: 'ಪ್ರೊಫೈಲ್',
    orders: 'ಆರ್ಡರ್‌ಗಳು',
    welcome: 'eCharak ಗೆ ಸ್ವಾಗತ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    buyNow: 'ಈಗ ಖರೀದಿಸಿ',
    price: 'ಬೆಲೆ',
    quantity: 'ಪ್ರಮಾಣ',
  },
  mr: {
    home: 'मुख्यपृष्ठ',
    search: 'शोधा',
    cart: 'कार्ट',
    profile: 'प्रोफाइल',
    orders: 'ऑर्डर',
    welcome: 'eCharak मध्ये आपले स्वागत आहे',
    addToCart: 'कार्टमध्ये जोडा',
    buyNow: 'आता खरेदी करा',
    price: 'किंमत',
    quantity: 'प्रमाण',
  },
  gu: {
    home: 'હોમ',
    search: 'શોધો',
    cart: 'કાર્ટ',
    profile: 'પ્રોફાઇલ',
    orders: 'ઓર્ડર્સ',
    welcome: 'eCharak માં આપનું સ્વાગત છે',
    addToCart: 'કાર્ટમાં ઉમેરો',
    buyNow: 'હમણાં ખરીદો',
    price: 'કિંમત',
    quantity: 'જથ્થો',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('echarak_language') as Language;
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('echarak_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
