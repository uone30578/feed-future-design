import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/ui/splash-screen";
import { Onboarding } from "@/components/ui/onboarding";
import { AuthScreen } from "@/components/ui/auth-screen";
import { HomeDashboard } from "@/components/ui/home-dashboard";
import { RestaurantListing } from "@/components/ui/restaurant-listing";

type AppScreen = "splash" | "onboarding" | "auth" | "home" | "restaurants";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash");
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (hasSeenOnboarding && isLoggedIn) {
      setIsFirstVisit(false);
    }
  }, []);

  const handleSplashComplete = () => {
    if (isFirstVisit) {
      setCurrentScreen("onboarding");
    } else {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      setCurrentScreen(isLoggedIn ? "home" : "auth");
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setCurrentScreen("auth");
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setCurrentScreen("home");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as AppScreen);
  };

  const handleBack = () => {
    setCurrentScreen("home");
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={handleSplashComplete} />;
      case "onboarding":
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case "auth":
        return <AuthScreen onLogin={handleLogin} />;
      case "home":
        return <HomeDashboard onNavigate={handleNavigate} />;
      case "restaurants":
        return <RestaurantListing onBack={handleBack} onSelectRestaurant={(id) => console.log("Selected restaurant:", id)} />;
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentScreen()}
    </div>
  );
};

export default Index;
