import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Bell,
  Gift,
  Truck,
  Heart,
  Award,
  AlertCircle,
  Clock
} from "lucide-react";

interface NotificationsProps {
  onBack: () => void;
}

const notifications = [
  {
    id: 1,
    type: "order",
    title: "Order Delivered Successfully! 🎉",
    message: "Your Mediterranean Bowl from Green Bistro has been delivered. You saved ₹150 and helped reduce food waste!",
    time: "2 minutes ago",
    read: false,
    icon: Truck,
    color: "text-success"
  },
  {
    id: 2,
    type: "impact",
    title: "Amazing! You've saved 10kg of food! 🌱",
    message: "Your sustainable choices this month prevented 10kg of food from going to waste. Keep up the great work!",
    time: "1 hour ago",
    read: false,
    icon: Award,
    color: "text-primary"
  },
  {
    id: 3,
    type: "offer",
    title: "50% OFF at Pizza Corner! 🍕",
    message: "Surplus pizza available now at Pizza Corner. Limited quantity - order before it's gone!",
    time: "2 hours ago",
    read: true,
    icon: Gift,
    color: "text-warning"
  },
  {
    id: 4,
    type: "donation",
    title: "Your donation helped feed 5 people ❤️",
    message: "Thanks to your ₹100 donation, 5 people received nutritious meals through Akshaya Patra Foundation.",
    time: "5 hours ago",
    read: true,
    icon: Heart,
    color: "text-red-500"
  },
  {
    id: 5,
    type: "alert",
    title: "Surplus Food Alert Near You! ⏰",
    message: "3 restaurants within 1km have surplus food available. Order now and save money while helping the environment!",
    time: "1 day ago",
    read: true,
    icon: AlertCircle,
    color: "text-eco-medium"
  },
  {
    id: 6,
    type: "achievement",
    title: "New Badge Unlocked: Eco Warrior! 🏆",
    message: "Congratulations! You've earned the Eco Warrior badge for saving over 5kg of food. Share your achievement!",
    time: "2 days ago",
    read: true,
    icon: Award,
    color: "text-eco-dark"
  },
  {
    id: 7,
    type: "reminder",
    title: "Weekly Impact Report Available 📊",
    message: "Your weekly sustainability report is ready! You've saved ₹500 and helped feed 12 people this week.",
    time: "3 days ago",
    read: true,
    icon: Clock,
    color: "text-muted-foreground"
  }
];

const getTypeLabel = (type: string) => {
  const labels = {
    order: "Order",
    impact: "Impact",
    offer: "Offer",
    donation: "Donation",
    alert: "Alert",
    achievement: "Achievement",
    reminder: "Reminder"
  };
  return labels[type as keyof typeof labels] || type;
};

const getTypeBadgeVariant = (type: string) => {
  const variants = {
    order: "default",
    impact: "secondary",
    offer: "destructive", 
    donation: "outline",
    alert: "secondary",
    achievement: "default",
    reminder: "outline"
  };
  return variants[type as keyof typeof variants] || "outline";
};

export const Notifications = ({ onBack }: NotificationsProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero px-4 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="outline" onClick={onBack} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <Button size="icon" variant="outline" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Quick Actions */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full">
            All
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full">
            Orders
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full">
            Offers
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full">
            Impact
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap rounded-full">
            Achievements
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4 mb-8">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`p-4 transition-all hover:shadow-soft ${
                !notification.read ? 'bg-accent/20 border-primary/20' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full bg-accent/30 ${notification.color}`}>
                  <notification.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold ${!notification.read ? 'text-primary' : ''}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2 ml-2">
                      <Badge 
                        variant={getTypeBadgeVariant(notification.type) as any}
                        className="text-xs"
                      >
                        {getTypeLabel(notification.type)}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                    
                    {(notification.type === 'offer' || notification.type === 'alert') && (
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Impact Summary */}
        <Card className="p-6 mb-8 bg-gradient-eco text-white">
          <h3 className="font-bold text-lg mb-3">🌟 This Week's Notifications Impact</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Offers Used</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹850</div>
              <div className="text-sm opacity-90">Money Saved</div>
            </div>
            <div>
              <div className="text-2xl font-bold">3.2kg</div>
              <div className="text-sm opacity-90">Food Rescued</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};