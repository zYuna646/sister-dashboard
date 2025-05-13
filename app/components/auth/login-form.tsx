"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Form, FormSection, FormFooter } from "../ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { EmailField, PasswordField } from "../ui/form-field";
import { login } from "@/app/lib/auth";

interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
  redirectPath?: string;
  defaultEmail?: string;
  defaultPassword?: string;
}

export const LoginForm = ({
  className = "",
  onSuccess,
  redirectPath = "/dashboard",
  defaultEmail = "Admin@example.com",
  defaultPassword = "Admin",
}: LoginFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  // Set default values for the form
  const [formValues, setFormValues] = useState({
    email: defaultEmail,
    password: defaultPassword,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const { email, password } = formValues;

    // Validate form
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const user = await login({ email, password });
      
      if (user) {
        if (onSuccess) {
          onSuccess();
        }
        router.push(redirectPath);
      } else {
        setErrors({
          general: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
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
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {errors.general}
            </div>
          )}
          <FormSection>
            <EmailField
              id="email"
              name="email"
              label="Email address"
              error={errors.email}
              fullWidth
              disabled={isLoading}
              value={formValues.email}
              onChange={handleChange}
            />
            <PasswordField
              id="password"
              name="password"
              label="Password"
              error={errors.password}
              fullWidth
              disabled={isLoading}
              value={formValues.password}
              onChange={handleChange}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </FormSection>
          <FormFooter>
            <Button type="submit" fullWidth isLoading={isLoading}>
              Sign in
            </Button>
          </FormFooter>
        </Form>
      </CardContent>
    </Card>
  );
}; 