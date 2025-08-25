import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  User, 
  MapPin, 
  Phone,
  Mail,
  Heart,
  Award,
  ShoppingBag,
  Leaf,
  Settings,
  HelpCircle,
  LogOut,
  Edit
} from "lucide-react";

interface ProfilePageProps {
  onBack: () => void;
}

const orderHistory = [
  {
    id: "FF123456",
    restaurant: "Green Bistro",
    items: ["Mediterranean Bowl", "Quinoa Salad"],
    date: "Today, 2:30 PM",
    amount: 273,
    status: "Delivered",
    rating: 5
  },
  {
    id: "FF123455", 
    restaurant: "Spice Garden",
    items: ["Butter Chicken", "Naan"],
    date: "Yesterday, 7:45 PM",
    amount: 209,
    status: "Delivered",
    rating: 4
  },
  {
    id: "FF123454",
    restaurant: "Pizza Corner", 
    items: ["Margherita Pizza"],
    date: "2 days ago, 8:20 PM",
    amount: 119,
    status: "Delivered",
    rating: 5
  }
];

const achievements = [
  { id: 1, title: "Eco Warrior", description: "Saved 5kg of food", icon: "🌿", earned: true },
  { id: 2, title: "Kind Heart", description: "Donated 10 meals", icon: "💚", earned: true },
  { id: 3, title: "Food Savior", description: "Prevented 100 meals from waste", icon: "🍽️", earned: true },
  { id: 4, title: "Community Champion", description: "Referred 5 friends", icon: "🏆", earned: false },
  { id: 5, title: "Sustainability Star", description: "Used app for 30 days", icon: "⭐", earned: false }
];

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const totalOrdersCount = orderHistory.length;
  const totalSaved = orderHistory.reduce((sum, order) => sum + (order.amount * 0.5), 0); // Assuming 50% savings
  const foodSaved = 12.5; // kg
  const mealsDonated = 25;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero px-4 pt-12 pb-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button size="icon" variant="outline" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-gradient-primary text-white text-xl font-bold">
              AK
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Arjun Kumar</h2>
            <p className="text-muted-foreground">Food sustainability enthusiast</p>
            <div className="flex items-center mt-2">
              <MapPin className="w-4 h-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">Koramangala, Bangalore</span>
            </div>
          </div>
          <Button size="icon" variant="outline" className="rounded-full">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center bg-gradient-eco text-white">
            <Leaf className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{foodSaved}kg</div>
            <div className="text-sm opacity-90">Food Saved</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-food text-white">
            <Heart className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{mealsDonated}</div>
            <div className="text-sm opacity-90">Meals Donated</div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center">
            <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-xl font-bold">{totalOrdersCount}</div>
            <div className="text-sm text-muted-foreground">Orders</div>
          </Card>
          <Card className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-success" />
            <div className="text-xl font-bold">₹{Math.round(totalSaved)}</div>
            <div className="text-sm text-muted-foreground">Money Saved</div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 text-warning mr-2" />
            Achievements
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-3 rounded-lg text-center ${
                  achievement.earned 
                    ? 'bg-gradient-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium">{achievement.title}</div>
                {!achievement.earned && (
                  <div className="text-xs opacity-75 mt-1">Locked</div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Orders</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {orderHistory.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{order.restaurant}</h4>
                    <Badge variant="secondary" className="bg-success text-success-foreground text-xs">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                    <span className="font-semibold">₹{order.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span>arjun.kumar@example.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </Card>

        {/* Settings Menu */}
        <Card className="p-4 mb-8">
          <h3 className="font-semibold mb-4">Settings</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start h-auto p-3">
              <Settings className="w-5 h-5 mr-3 text-muted-foreground" />
              <span>App Settings</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-3">
              <HelpCircle className="w-5 h-5 mr-3 text-muted-foreground" />
              <span>Help & Support</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-3 text-destructive">
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};