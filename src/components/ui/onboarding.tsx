import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import saveFoodImg from "@/assets/onboarding-save-food.png";
import affordableMealsImg from "@/assets/onboarding-affordable-meals.png";
import feedHungryImg from "@/assets/onboarding-feed-hungry.png";

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "Save Food",
    description: "Restaurants share their surplus food with our community, reducing waste and helping the environment.",
    image: saveFoodImg,
    bgGradient: "bg-gradient-eco"
  },
  {
    title: "Affordable Meals",
    description: "Get delicious, quality meals at discounted prices while supporting sustainability initiatives.",
    image: affordableMealsImg,
    bgGradient: "bg-gradient-food"
  },
  {
    title: "Feed the Hungry",
    description: "Every order helps donate meals to NGOs and communities in need. Make an impact with every bite.",
    image: feedHungryImg,
    bgGradient: "bg-gradient-primary"
  }
];

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={onComplete} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className={`w-full max-w-md rounded-3xl p-8 ${currentData.bgGradient} shadow-soft mb-8 animate-slide-up`}>
          <img
            src={currentData.image}
            alt={currentData.title}
            className="w-full h-48 object-contain mb-6"
          />
        </div>

        <div className="text-center max-w-sm">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {currentData.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {currentData.description}
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex space-x-2 mt-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <Button
          onClick={nextStep}
          className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90"
        >
          <span>
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          </span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};