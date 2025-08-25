import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/ui/splash-screen";
import { Onboarding } from "@/components/ui/onboarding";
import { AuthScreen } from "@/components/ui/auth-screen";
import { HomeDashboard } from "@/components/ui/home-dashboard";
import { RestaurantListing } from "@/components/ui/restaurant-listing";
import { MealDetail } from "@/components/ui/meal-detail";
import { CartCheckout } from "@/components/ui/cart-checkout";
import { OrderTracking } from "@/components/ui/order-tracking";
import { DonationSection } from "@/components/ui/donation-section";
import { ProfilePage } from "@/components/ui/profile-page";
import { Notifications } from "@/components/ui/notifications";

type AppScreen = "splash" | "onboarding" | "auth" | "home" | "restaurants" | "meal-detail" | "cart" | "order-tracking" | "donations" | "profile" | "notifications";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState("");

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

  const handleAddToCart = (item: any) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].cartQuantity += item.cartQuantity;
      updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].discountedPrice * updatedItems[existingItemIndex].cartQuantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, item]);
    }
    
    setCurrentScreen("cart");
  };

  const handleUpdateCart = (items: any[]) => {
    setCartItems(items);
  };

  const handleOrderPlaced = (orderId: string) => {
    setCurrentOrderId(orderId);
    setCartItems([]); // Clear cart
    setCurrentScreen("order-tracking");
  };

  const handleSelectRestaurant = (id: number) => {
    setCurrentScreen("meal-detail");
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
        return <RestaurantListing onBack={handleBack} onSelectRestaurant={handleSelectRestaurant} />;
      case "meal-detail":
        return <MealDetail onBack={() => setCurrentScreen("restaurants")} onAddToCart={handleAddToCart} onViewCart={() => setCurrentScreen("cart")} />;
      case "cart":
        return <CartCheckout onBack={handleBack} onOrderPlaced={handleOrderPlaced} cartItems={cartItems} onUpdateCart={handleUpdateCart} />;
      case "order-tracking":
        return <OrderTracking orderId={currentOrderId} onBackToHome={handleBack} />;
      case "donations":
        return <DonationSection onBack={handleBack} />;
      case "profile":
        return <ProfilePage onBack={handleBack} />;
      case "notifications":
        return <Notifications onBack={handleBack} />;
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
