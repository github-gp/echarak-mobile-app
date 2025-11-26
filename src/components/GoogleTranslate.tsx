'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    translateTo: (lang: string) => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,ta,te,kn,mr,gu',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Helper function to trigger translation
    window.translateTo = (lang: string) => {
      const selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectField) {
        selectField.value = lang;
        selectField.dispatchEvent(new Event('change'));
      }
    };

    // Load saved language
    const savedLang = localStorage.getItem('echarak_language');
    if (savedLang && savedLang !== 'en') {
      setTimeout(() => {
        window.translateTo(savedLang);
      }, 2000);
    }

    addScript();
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }} />;
}
