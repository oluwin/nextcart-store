"use client";

import { Button } from "@/components/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import { useCheckout } from "@/components/features/checkout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const PaymentSummary = ({
  card,
}: {
  card?: { number?: string; expiry?: string };
}) => (
  <div className="space-y-3">
    <h3 className="font-medium">Payment Method</h3>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Card Number</p>
        <p>•••• •••• •••• {card?.number?.slice(-4)}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Expires</p>
        <p>{card?.expiry || "—"}</p>
      </div>
    </div>
  </div>
);

const ShippingAddress = ({
  shipping,
}: {
  shipping: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}) => (
  <div className="space-y-3">
    <h3 className="font-medium">Shipping Address</h3>
    <div className="text-sm space-y-1">
      <p>{shipping.address}</p>
      <p>
        {shipping.city}, {shipping.country} {shipping.postalCode}
      </p>
    </div>
  </div>
);

export default function ReviewPage() {
  const { data, setCurrentStep } = useCheckout();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% success rate for demo
            isSuccess ? resolve("Success") : reject("Payment failed");
          }, 1500);
        }),
        {
          loading: "Processing payment...",
          success: () => {
            setCurrentStep(3); // Mark as completed
            router.push("/checkout/success");
            return (
              <div>
                <b>Order confirmed!</b>
                <p className="text-sm">
                  Card ending in {data.payment.card?.number.slice(-4)}
                </p>
              </div>
            );
          },
          error: (err) => <b>{err}</b>,
        }
      );
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleEdit = () => {
    setCurrentStep(1); // Return to payment step
    router.push("/checkout/payment");
  };

  const buttonStyles =
    "bg-gradient-to-r from-cyan-600 to-green-500 hover:from-cyan-700 hover:to-green-600 transition-all";

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <PaymentSummary card={data.payment?.card || {}} />
          {data.shipping && <ShippingAddress shipping={data.shipping} />}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleEdit}>
              Edit Payment
            </Button>
            <Button
              className={buttonStyles}
              onClick={handleSubmit}
              disabled={!data.payment?.card}
            >
              Place Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
