import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Bell, 
  User, 
  Utensils, 
  Coffee, 
  Wine, 
  Heart,
  Clock,
  Star,
  Truck
} from "lucide-react";

interface HomeDashboardProps {
  onNavigate: (screen: string) => void;
}

const categories = [
  { name: "Meals", icon: Utensils, color: "bg-success" },
  { name: "Snacks", icon: Coffee, color: "bg-warning" },
  { name: "Beverages", icon: Wine, color: "bg-eco-medium" },
  { name: "Donations", icon: Heart, color: "bg-food-medium" },
];

const featuredRestaurants = [
  {
    id: 1,
    name: "Green Bistro",
    image: "🥗",
    rating: 4.5,
    category: "Healthy",
    surplusItems: 8,
    distance: "0.5 km",
    discount: "50%",
    estimatedSavings: "₹150"
  },
  {
    id: 2,
    name: "Spice Garden",
    image: "🍛",
    rating: 4.3,
    category: "Indian",
    surplusItems: 12,
    distance: "1.2 km", 
    discount: "40%",
    estimatedSavings: "₹200"
  },
  {
    id: 3,
    name: "Pizza Corner",
    image: "🍕",
    rating: 4.7,
    category: "Italian",
    surplusItems: 6,
    distance: "0.8 km",
    discount: "60%",
    estimatedSavings: "₹180"
  }
];

export const HomeDashboard = ({ onNavigate }: HomeDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning! 👋</h1>
            <div className="flex items-center mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">Koramangala, Bangalore</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button size="icon" variant="outline" className="rounded-full" onClick={() => onNavigate('notifications')}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full" onClick={() => onNavigate('profile')}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search restaurants or meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 rounded-xl bg-card border-0 shadow-soft"
          />
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Banner Carousel */}
        <Card className="p-6 mb-6 bg-gradient-primary text-white shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Save Food, Save Money! 🌱</h3>
              <p className="text-sm opacity-90 mb-3">Get surplus food at 50% off</p>
              <Button variant="secondary" size="sm" onClick={() => onNavigate('donations')}>
                Donate Now
              </Button>
            </div>
            <div className="text-6xl">🥘</div>
          </div>
        </Card>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex flex-col h-20 p-3 rounded-xl shadow-soft hover:shadow-eco transition-all"
                onClick={() => onNavigate('donations')}
              >
                <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center mb-2`}>
                  <category.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Restaurants */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Surplus Food Available</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('restaurants')}>
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {featuredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="p-4 shadow-soft hover:shadow-eco transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-food rounded-xl flex items-center justify-center text-2xl">
                    {restaurant.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{restaurant.name}</h3>
                      <Badge variant="secondary" className="bg-success text-success-foreground">
                        -{restaurant.discount}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-warning mr-1" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{restaurant.category}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Truck className="w-4 h-4 mr-1" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-warning font-medium">{restaurant.surplusItems} items</span>
                        <span className="text-muted-foreground"> available</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-success font-medium">Save {restaurant.estimatedSavings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <Card className="p-6 mb-6 bg-gradient-eco text-white shadow-eco">
          <h3 className="text-lg font-bold mb-4">Your Impact This Week 🌟</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">2.5kg</div>
              <div className="text-sm opacity-90">Food Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm opacity-90">Meals Donated</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};