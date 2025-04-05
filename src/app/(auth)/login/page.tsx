import LoginForm from "@/components/components/auth/login-form";
import { Card } from "@/components/components/ui/card";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <Suspense
        fallback={
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-6">NextCart | Login</h1>
            <p>Loading login form...</p>
          </Card>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
