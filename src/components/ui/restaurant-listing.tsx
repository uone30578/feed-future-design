import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Truck, 
  Heart,
  MapPin
} from "lucide-react";

interface RestaurantListingProps {
  onBack: () => void;
  onSelectRestaurant: (id: number) => void;
}

const restaurants = [
  {
    id: 1,
    name: "Green Bistro",
    image: "🥗",
    rating: 4.5,
    category: "Healthy",
    distance: "0.5 km",
    deliveryTime: "15-20 mins",
    surplus: [
      {
        id: 1,
        name: "Mediterranean Bowl",
        originalPrice: 299,
        discountedPrice: 149,
        quantity: 3,
        expiryTime: "2 hours",
        image: "🥙"
      },
      {
        id: 2,
        name: "Quinoa Salad",
        originalPrice: 249,
        discountedPrice: 124,
        quantity: 5,
        expiryTime: "3 hours",
        image: "🥗"
      }
    ]
  },
  {
    id: 2,
    name: "Spice Garden",
    image: "🍛",
    rating: 4.3,
    category: "Indian",
    distance: "1.2 km",
    deliveryTime: "20-25 mins",
    surplus: [
      {
        id: 3,
        name: "Butter Chicken",
        originalPrice: 349,
        discountedPrice: 209,
        quantity: 2,
        expiryTime: "1 hour",
        image: "🍗"
      },
      {
        id: 4,
        name: "Biryani",
        originalPrice: 399,
        discountedPrice: 199,
        quantity: 4,
        expiryTime: "2 hours",
        image: "🍛"
      }
    ]
  },
  {
    id: 3,
    name: "Pizza Corner",
    image: "🍕",
    rating: 4.7,
    category: "Italian",
    distance: "0.8 km",
    deliveryTime: "18-22 mins",
    surplus: [
      {
        id: 5,
        name: "Margherita Pizza",
        originalPrice: 299,
        discountedPrice: 119,
        quantity: 2,
        expiryTime: "1.5 hours",
        image: "🍕"
      }
    ]
  }
];

export const RestaurantListing = ({ onBack, onSelectRestaurant }: RestaurantListingProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero px-4 pt-12 pb-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button size="icon" variant="outline" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Surplus Food Near You</h1>
            <div className="flex items-center mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">Koramangala, Bangalore</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 rounded-xl bg-card border-0 shadow-soft"
            />
          </div>
          <Button size="icon" variant="outline" className="h-12 w-12 rounded-xl">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Filter Chips */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
          {["all", "nearby", "expiring-soon", "high-discount"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="whitespace-nowrap rounded-full"
            >
              {filter.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </Button>
          ))}
        </div>

        {/* Restaurant Cards */}
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden shadow-soft">
              {/* Restaurant Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-food rounded-xl flex items-center justify-center text-xl">
                      {restaurant.image}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground">{restaurant.category}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-full">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-warning mr-1" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
              </div>

              {/* Surplus Items */}
              <div className="p-4">
                <h4 className="font-medium mb-3 text-success">Available Surplus Items</h4>
                <div className="space-y-3">
                  {restaurant.surplus.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-eco rounded-lg flex items-center justify-center text-lg">
                          {item.image}
                        </div>
                        <div>
                          <h5 className="font-medium">{item.name}</h5>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Expires in {item.expiryTime}</span>
                            <span>•</span>
                            <span>{item.quantity} left</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.originalPrice}
                          </span>
                          <span className="font-bold text-success">
                            ₹{item.discountedPrice}
                          </span>
                        </div>
                        <Badge variant="secondary" className="bg-warning text-warning-foreground text-xs">
                          {getDiscountPercentage(item.originalPrice, item.discountedPrice)}% OFF
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-primary hover:opacity-90"
                  onClick={() => onSelectRestaurant(restaurant.id)}
                >
                  View Details & Order
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Impact Banner */}
        <Card className="mt-6 mb-8 p-6 bg-gradient-eco text-white shadow-eco">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">🌱 Help Us Save More Food!</h3>
            <p className="text-sm opacity-90 mb-3">
              Every order helps reduce food waste and feeds communities in need
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div>
                <div className="font-bold text-lg">1.2k kg</div>
                <div className="opacity-80">Food Saved Today</div>
              </div>
              <div>
                <div className="font-bold text-lg">350</div>
                <div className="opacity-80">Meals Donated</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};