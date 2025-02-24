"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Prüfe beim Laden, ob bereits ein Cookie-Consent existiert
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black shadow-lg z-50 p-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white">
          Diese Website verwendet Cookies. Mit der Nutzung stimmen Sie der
          Verwendung von Cookies zu.
        </p>
        <div className="flex gap-2">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-purple-300 hover:bg-purple-400 text-white rounded-full text-sm transition-colors"
          >
            Akzeptieren
          </button>
          <button
            onClick={declineCookies}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
}
