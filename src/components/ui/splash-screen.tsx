import { useEffect, useState } from "react";
import logo from "@/assets/feeding-future-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-hero transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-bounce-soft">
          <img
            src={logo}
            alt="Feeding Future Logo"
            className="w-32 h-32 mx-auto drop-shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-primary mb-2">
          Feeding Future
        </h1>
        
        <p className="text-lg text-muted-foreground font-medium">
          Saving Food, Feeding Lives
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce mx-1"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce mx-1" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce mx-1" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};