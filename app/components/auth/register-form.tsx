"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Form, FormSection, FormFooter } from "../ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { EmailField, PasswordField, TextField } from "../ui/form-field";

interface RegisterFormProps {
  className?: string;
  onSuccess?: () => void;
  redirectPath?: string;
}

export const RegisterForm = ({
  className = "",
  onSuccess,
  redirectPath = "/dashboard",
}: RegisterFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate form
    const newErrors: typeof errors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Mock registration process
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success (demo only)
      if (onSuccess) {
        onSuccess();
      }
      router.push(redirectPath);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        general: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {errors.general}
            </div>
          )}
          <FormSection>
            <TextField
              id="name"
              name="name"
              label="Full name"
              error={errors.name}
              fullWidth
              disabled={isLoading}
              autoComplete="name"
            />
            <EmailField
              id="email"
              name="email"
              label="Email address"
              error={errors.email}
              fullWidth
              disabled={isLoading}
            />
            <PasswordField
              id="password"
              name="new-password"
              label="Password"
              error={errors.password}
              fullWidth
              disabled={isLoading}
              helperText="Password must be at least 8 characters"
            />
            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              error={errors.confirmPassword}
              fullWidth
              disabled={isLoading}
            />
            <div className="flex items-center mt-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>
          </FormSection>
          <FormFooter>
            <Button type="submit" fullWidth isLoading={isLoading}>
              Sign up
            </Button>
          </FormFooter>
        </Form>
      </CardContent>
    </Card>
  );
}; 