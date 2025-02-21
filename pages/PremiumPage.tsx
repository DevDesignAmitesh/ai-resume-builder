"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Script from "next/script";
import { createOrder } from "@/app/api/actions/createOrder";
import { useRouter } from "next/navigation";
import { premiumUser } from "@/app/api/actions/premiumUser";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const PremiumPage = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      duration: "forever",
      features: [
        "Create up to 3 resumes"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "₹500",
      duration: "forever",
      features: [
        "Unlimited resumes"
      ],
      buttonText: "Upgrade to Pro",
      popular: true
    }
  ];

  const AMOUNT = 500;
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handlePayment = async (text: string) => {
    if (text === "Get Started") {
      router.push("/dashboard")
      return;
    }
    try {
      setIsProcessing(true)
      const res = await createOrder()
      const options = {
        key: process.env.NEXT_PUBLIC_RAZRPAY_KEY!,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "my company name",
        description: "test transaction",
        order_id: res.orderId,
        handler: async () => {
          await premiumUser()
          toast({
            title: "Payment Done",
            description: "Redirecting to the dashboard page",
          });
          router.push("/dashboard")
        },
        prefill: {
          name: "john doe",
          email: "jhondoes@gmail.com",
          contact: "999999999"
        },
        theme: "#dadada"
      }

      const rzp1 = new window.Razorpay(options)
      rzp1.open()
      setIsProcessing(false)
    } catch (error) {
      setIsProcessing(false)
      return;
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-background p-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with our free plan or upgrade to Pro for unlimited access
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular
                ? "border-primary shadow-lg scale-105"
                : "border-border"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> / {plan.duration}</span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  disabled={isProcessing}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handlePayment(plan.buttonText)}
                >
                  {isProcessing && plan.buttonText === "Upgrade to Pro" ? "Processing" : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PremiumPage;