import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus,
  MapPin,
  CreditCard,
  Smartphone,
  Wallet,
  Heart,
  Truck
} from "lucide-react";

interface CartCheckoutProps {
  onBack: () => void;
  onOrderPlaced: (orderId: string) => void;
  cartItems: any[];
  onUpdateCart: (items: any[]) => void;
}

export const CartCheckout = ({ onBack, onOrderPlaced, cartItems, onUpdateCart }: CartCheckoutProps) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Cart, 2: Address, 3: Payment
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [donationAmount, setDonationAmount] = useState(0);
  const [address, setAddress] = useState({
    street: "123 Green Street",
    area: "Koramangala",
    city: "Bangalore",
    pincode: "560034"
  });

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === itemId 
        ? { ...item, cartQuantity: newQuantity, totalPrice: item.discountedPrice * newQuantity }
        : item
    ).filter(item => item.cartQuantity > 0);
    onUpdateCart(updatedItems);
  };

  const removeItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    onUpdateCart(updatedItems);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getDeliveryFee = () => deliveryOption === "delivery" ? 29 : 0;
  const getTotalSavings = () => {
    return cartItems.reduce((sum, item) => 
      sum + ((item.originalPrice - item.discountedPrice) * item.cartQuantity), 0
    );
  };
  const getTotal = () => getSubtotal() + getDeliveryFee() + donationAmount;

  const handlePlaceOrder = () => {
    const orderId = "FF" + Date.now().toString().slice(-6);
    onOrderPlaced(orderId);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-hero px-4 pt-12 pb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button size="icon" variant="outline" onClick={onBack} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Your Cart ({cartItems.length})</h1>
          </div>
        </div>

        <div className="px-4 mt-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some delicious surplus food to get started!</p>
              <Button onClick={onBack} className="bg-gradient-primary">
                Browse Food
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-food rounded-xl flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-bold text-success">₹{item.discountedPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.cartQuantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 rounded-full text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Donation Section */}
              <Card className="p-4 mb-6 bg-gradient-eco text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">Add a Donation</span>
                  </div>
                </div>
                <p className="text-sm opacity-90 mb-4">Help us feed more people in need</p>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setDonationAmount(amount)}
                      className="text-xs"
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Bill Summary */}
              <Card className="p-4 mb-6">
                <h3 className="font-semibold mb-4">Bill Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-success">
                    <span>You saved</span>
                    <span>-₹{getTotalSavings()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{getDeliveryFee()}</span>
                  </div>
                  {donationAmount > 0 && (
                    <div className="flex justify-between text-warning">
                      <span>Donation</span>
                      <span>₹{donationAmount}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{getTotal()}</span>
                  </div>
                </div>
              </Card>

              <Button 
                onClick={() => setCurrentStep(2)} 
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                Proceed to Delivery
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-hero px-4 pt-12 pb-6">
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="outline" onClick={() => setCurrentStep(1)} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Delivery Details</h1>
          </div>
        </div>

        <div className="px-4 mt-6">
          {/* Delivery Option */}
          <Card className="p-4 mb-6">
            <h3 className="font-semibold mb-4">Delivery Option</h3>
            <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Home Delivery</span>
                    </div>
                    <span className="text-sm text-muted-foreground">₹29</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Self Pickup</span>
                    </div>
                    <span className="text-sm text-success">Free</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Address */}
          {deliveryOption === "delivery" && (
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-4">Delivery Address</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                />
                <Input
                  placeholder="Area"
                  value={address.area}
                  onChange={(e) => setAddress({...address, area: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                  />
                  <Input
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                  />
                </div>
              </div>
            </Card>
          )}

          <Button 
            onClick={() => setCurrentStep(3)} 
            className="w-full bg-gradient-primary hover:opacity-90"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero px-4 pt-12 pb-6">
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="outline" onClick={() => setCurrentStep(2)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Payment</h1>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Payment Methods */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-4">Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <span>UPI</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4" />
                    <span>Wallet</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Credit/Debit Card</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1">
                  <span>Cash on Delivery</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Order Summary */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items ({cartItems.length})</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{getDeliveryFee()}</span>
            </div>
            {donationAmount > 0 && (
              <div className="flex justify-between text-warning">
                <span>Donation</span>
                <span>₹{donationAmount}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>
        </Card>

        <Button 
          onClick={handlePlaceOrder} 
          className="w-full bg-gradient-primary hover:opacity-90"
        >
          Place Order - ₹{getTotal()}
        </Button>
      </div>
    </div>
  );
};