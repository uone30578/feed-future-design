import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  MapPin,
  Phone,
  Star,
  MessageCircle
} from "lucide-react";

interface OrderTrackingProps {
  orderId: string;
  onBackToHome: () => void;
}

const orderSteps = [
  { id: 1, title: "Order Confirmed", description: "Your order has been confirmed", icon: CheckCircle },
  { id: 2, title: "Being Prepared", description: "Restaurant is preparing your food", icon: Clock },
  { id: 3, title: "Out for Delivery", description: "Driver is on the way", icon: Truck },
  { id: 4, title: "Delivered", description: "Order delivered successfully", icon: CheckCircle }
];

export const OrderTracking = ({ orderId, onBackToHome }: OrderTrackingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState(25);

  useEffect(() => {
    // Simulate order progress
    const intervals = [
      setTimeout(() => setCurrentStep(2), 2000),
      setTimeout(() => setCurrentStep(3), 8000),
      setTimeout(() => setCurrentStep(4), 15000)
    ];

    // Update estimated time
    const timeInterval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => {
      intervals.forEach(clearTimeout);
      clearInterval(timeInterval);
    };
  }, []);

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const getProgressPercentage = () => {
    return (currentStep / orderSteps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero px-4 pt-12 pb-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Order Tracking</h1>
          <p className="text-muted-foreground">Order ID: {orderId}</p>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Live Tracking Card */}
        <Card className="p-6 mb-6 bg-gradient-primary text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">
                {currentStep === 4 ? "Order Delivered! 🎉" : "Order in Progress"}
              </h3>
              <p className="text-sm opacity-90">
                {currentStep === 4 
                  ? "Thank you for choosing Feeding Future!" 
                  : `Estimated delivery: ${estimatedTime} mins`
                }
              </p>
            </div>
            <div className="text-4xl">
              {currentStep === 4 ? "✅" : "🚚"}
            </div>
          </div>
          <Progress value={getProgressPercentage()} className="h-2 bg-white/20" />
        </Card>

        {/* Order Steps */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Order Status</h3>
          <div className="space-y-4">
            {orderSteps.map((step, index) => {
              const status = getStepStatus(step.id);
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    status === "completed" ? "bg-success text-success-foreground" :
                    status === "current" ? "bg-primary text-primary-foreground animate-pulse" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${status === "current" ? "text-primary" : ""}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {status === "current" && (
                      <p className="text-xs text-primary font-medium mt-1">In Progress...</p>
                    )}
                  </div>
                  {status === "completed" && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Person Info */}
        {currentStep >= 3 && (
          <Card className="p-4 mb-6">
            <h3 className="font-semibold mb-3">Delivery Partner</h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-eco rounded-full flex items-center justify-center text-white font-bold">
                R
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Rajesh Kumar</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 text-warning" />
                  <span>4.8 rating</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="outline" className="rounded-full">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Order Items */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Order Items</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-food rounded-lg flex items-center justify-center text-lg">
                  🥙
                </div>
                <div>
                  <h4 className="font-medium">Mediterranean Bowl</h4>
                  <p className="text-sm text-muted-foreground">Green Bistro • Qty: 1</p>
                </div>
              </div>
              <span className="font-semibold">₹149</span>
            </div>
          </div>
        </Card>

        {/* Delivery Address */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Delivery Address</h3>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
            <div>
              <p className="font-medium">123 Green Street</p>
              <p className="text-sm text-muted-foreground">Koramangala, Bangalore - 560034</p>
            </div>
          </div>
        </Card>

        {/* Impact Stats */}
        <Card className="p-6 mb-6 bg-gradient-eco text-white">
          <h3 className="font-bold text-lg mb-3">🌱 Your Impact Today</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">0.8kg</div>
              <div className="text-sm opacity-90">Food Saved</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹150</div>
              <div className="text-sm opacity-90">Money Saved</div>
            </div>
          </div>
        </Card>

        {currentStep === 4 ? (
          <div className="space-y-3 mb-8">
            <Button 
              onClick={onBackToHome}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              Order More Food
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
            >
              Rate Your Experience
            </Button>
          </div>
        ) : (
          <Button 
            onClick={onBackToHome}
            variant="outline" 
            className="w-full mb-8"
          >
            Back to Home
          </Button>
        )}
      </div>
    </div>
  );
};