import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Truck, 
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  MapPin,
  Users
} from "lucide-react";

interface MealDetailProps {
  onBack: () => void;
  onAddToCart: (item: any) => void;
  onViewCart: () => void;
}

const mealData = {
  id: 1,
  name: "Mediterranean Bowl",
  restaurant: "Green Bistro",
  image: "🥙",
  originalPrice: 299,
  discountedPrice: 149,
  rating: 4.5,
  reviews: 128,
  description: "Fresh Mediterranean bowl with quinoa, grilled vegetables, feta cheese, olives, and tahini dressing. Made with organic ingredients and packed with nutrients.",
  ingredients: ["Quinoa", "Grilled Vegetables", "Feta Cheese", "Cherry Tomatoes", "Olives", "Tahini Dressing"],
  nutrition: {
    calories: 420,
    protein: "18g",
    carbs: "45g",
    fat: "22g"
  },
  expiryTime: "2 hours",
  quantity: 3,
  dietaryInfo: ["Vegetarian", "Gluten-Free Option"],
  pickupTime: "15-20 mins",
  distance: "0.5 km"
};

export const MealDetail = ({ onBack, onAddToCart, onViewCart }: MealDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      ...mealData,
      cartQuantity: quantity,
      totalPrice: mealData.discountedPrice * quantity
    };
    onAddToCart(cartItem);
  };

  const getDiscountPercentage = () => {
    return Math.round(((mealData.originalPrice - mealData.discountedPrice) / mealData.originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <Button size="icon" variant="outline" onClick={onBack} className="rounded-full bg-card/80 backdrop-blur">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => setIsFavorite(!isFavorite)}
            className="rounded-full bg-card/80 backdrop-blur"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>
        
        {/* Hero Image */}
        <div className="h-64 bg-gradient-food flex items-center justify-center text-8xl">
          {mealData.image}
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Basic Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">{mealData.name}</h1>
            <Badge variant="secondary" className="bg-warning text-warning-foreground">
              {getDiscountPercentage()}% OFF
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-3">{mealData.restaurant}</p>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-warning mr-1" />
              <span>{mealData.rating}</span>
              <span className="ml-1">({mealData.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>Expires in {mealData.expiryTime}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{mealData.quantity} left</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-success">₹{mealData.discountedPrice}</span>
              <span className="text-lg text-muted-foreground line-through">₹{mealData.originalPrice}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>{mealData.pickupTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{mealData.distance}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{mealData.description}</p>
        </Card>

        {/* Dietary Info */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Dietary Information</h3>
          <div className="flex flex-wrap gap-2">
            {mealData.dietaryInfo.map((info, index) => (
              <Badge key={index} variant="outline" className="bg-eco-light border-success">
                {info}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {mealData.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="outline">
                {ingredient}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Nutrition */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Nutrition (Per Serving)</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">{mealData.nutrition.calories}</div>
              <div className="text-xs text-muted-foreground">Calories</div>
            </div>
            <div>
              <div className="text-lg font-bold text-success">{mealData.nutrition.protein}</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div>
              <div className="text-lg font-bold text-warning">{mealData.nutrition.carbs}</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div>
              <div className="text-lg font-bold text-food-medium">{mealData.nutrition.fat}</div>
              <div className="text-xs text-muted-foreground">Fat</div>
            </div>
          </div>
        </Card>

        {/* Quantity Selector & Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center space-x-3">
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-8 w-8 rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => setQuantity(Math.min(mealData.quantity, quantity + 1))}
                  disabled={quantity >= mealData.quantity}
                  className="h-8 w-8 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - ₹{mealData.discountedPrice * quantity}
              </Button>
              <Button 
                variant="outline"
                onClick={onViewCart}
                className="px-4"
              >
                Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Spacer for fixed bottom bar */}
        <div className="h-32"></div>
      </div>
    </div>
  );
};