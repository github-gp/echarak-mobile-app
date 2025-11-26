import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { APP_CONFIG } from '@/lib/constants'
import { CartProvider } from '@/lib/cartContext'
import { WishlistProvider } from '@/lib/wishlistContext'
import { RoleProvider } from '@/lib/roleContext'
import { LanguageProvider } from '@/lib/languageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.tagline,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,ta,te,kn,mr,gu',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
            
            window.translateTo = function(lang) {
              var selectField = document.querySelector(".goog-te-combo");
              if(selectField) {
                selectField.value = lang;
                selectField.dispatchEvent(new Event('change'));
              }
            }
          `}
        </Script>
        <LanguageProvider>
          <RoleProvider>
            <CartProvider>
              <WishlistProvider>
                <div id="google_translate_element" style={{ display: 'none' }}></div>
                <div className="min-h-screen bg-slate-50">
                  {children}
                </div>
              </WishlistProvider>
            </CartProvider>
          </RoleProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
