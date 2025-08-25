import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Heart, 
  Users, 
  Utensils,
  Award,
  MapPin,
  Calendar
} from "lucide-react";

interface DonationSectionProps {
  onBack: () => void;
}

const ngos = [
  {
    id: 1,
    name: "Akshaya Patra Foundation",
    image: "🍽️",
    description: "Providing unlimited food for education. We serve nutritious meals to over 1.8 million children.",
    location: "Bangalore",
    mealsServed: "1.8M+",
    rating: 4.9,
    verified: true
  },
  {
    id: 2,
    name: "Feeding India",
    image: "🤝",
    description: "Fighting hunger and food wastage. We redistribute surplus food to feed the underprivileged.",
    location: "Pan India",
    mealsServed: "100M+",
    rating: 4.8,
    verified: true
  },
  {
    id: 3,
    name: "Robin Hood Army",
    image: "🏹",
    description: "We are a volunteer based organisation that works to get surplus food from restaurants to the less fortunate.",
    location: "Multiple Cities",
    mealsServed: "50M+",
    rating: 4.7,
    verified: true
  }
];

const donationOptions = [
  { amount: 50, meals: 2, description: "Feed 2 children for a day" },
  { amount: 100, meals: 4, description: "Provide lunch for a family" },
  { amount: 250, meals: 10, description: "Support 10 people with nutritious meals" },
  { amount: 500, meals: 20, description: "Feed an entire community group" }
];

export const DonationSection = ({ onBack }: DonationSectionProps) => {
  const communityProgress = 78; // Percentage of monthly goal reached

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-eco text-white px-4 pt-12 pb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button size="icon" variant="outline" onClick={onBack} className="rounded-full bg-white/20 border-white/30 text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Feed the Hungry</h1>
        </div>
        <p className="text-sm opacity-90">Every donation helps fight hunger and food waste</p>
      </div>

      <div className="px-4 mt-6">
        {/* Community Impact */}
        <Card className="p-6 mb-6 bg-gradient-hero">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-primary mb-2">This Month's Impact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success">15.2K</div>
                <div className="text-xs text-muted-foreground">Meals Donated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">3.8K</div>
                <div className="text-xs text-muted-foreground">People Fed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-eco-medium">850+</div>
                <div className="text-xs text-muted-foreground">Contributors</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Monthly Goal Progress</span>
              <span>{communityProgress}%</span>
            </div>
            <Progress value={communityProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              4,800 more meals needed to reach 20K goal
            </p>
          </div>
        </Card>

        {/* Quick Donation */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            Quick Donation
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {donationOptions.map((option) => (
              <Button
                key={option.amount}
                variant="outline"
                className="h-auto p-4 text-left flex flex-col items-start hover:bg-eco-light"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-primary">₹{option.amount}</span>
                  <Badge variant="secondary" className="text-xs">{option.meals} meals</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Partner NGOs */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 text-primary mr-2" />
            Our Partner NGOs
          </h3>
          
          <div className="space-y-4">
            {ngos.map((ngo) => (
              <Card key={ngo.id} className="p-4 hover:shadow-eco transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-food rounded-xl flex items-center justify-center text-2xl">
                    {ngo.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{ngo.name}</h4>
                      {ngo.verified && (
                        <Badge variant="secondary" className="text-xs bg-success text-success-foreground">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {ngo.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{ngo.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Utensils className="w-3 h-3 mr-1" />
                          <span>{ngo.mealsServed} meals</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-warning">★</span>
                        <span className="ml-1">{ngo.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
                  Donate Now
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Your Donation History */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 text-primary mr-2" />
            Your Impact This Month
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
              <div>
                <p className="font-medium">Total Donated</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-success">₹350</p>
                <p className="text-xs text-muted-foreground">14 meals</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-eco-light rounded-lg">
                <div className="text-lg font-bold text-success">5</div>
                <div className="text-xs text-muted-foreground">Donations Made</div>
              </div>
              <div className="p-3 bg-food-light rounded-lg">
                <div className="text-lg font-bold text-warning">14</div>
                <div className="text-xs text-muted-foreground">People Fed</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievement Badges */}
        <Card className="p-4 mb-8">
          <h3 className="font-semibold mb-4">Achievement Badges</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-gradient-eco text-white">
              <div className="text-2xl mb-1">🌟</div>
              <div className="text-xs font-medium">First Donor</div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-food text-white">
              <div className="text-2xl mb-1">💚</div>
              <div className="text-xs font-medium">Heart of Gold</div>
            </div>
            <div className="p-3 rounded-lg bg-muted text-muted-foreground opacity-50">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs font-medium">Champion</div>
              <div className="text-xs opacity-75">10 more donations</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};