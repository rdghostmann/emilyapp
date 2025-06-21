"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
  };

  if (!deferredPrompt) return null;

  return (
     <Button
    onClick={handleInstallClick}
    style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
    className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
  >
    Install EmilyAgros App
  </Button>
  );
}