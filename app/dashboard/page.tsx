"use client";

import React from "react";
import { ProtectedComponent } from "@/app/components/auth/protected-component";
import { useAuth } from "@/app/hooks/useAuth";
import { Container } from "@/app/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { logout } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <ProtectedComponent>
      <div className="min-h-screen bg-gray-100 py-12">
        <Container>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Dashboard</CardTitle>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Welcome, {user?.name}</h2>
                <p className="text-gray-600">You are logged in as {user?.email}</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Your Role</h3>
                <p className="text-blue-700">
                  {user?.role.name} ({user?.role.slug})
                </p>
                <div className="mt-2">
                  <h4 className="font-medium text-blue-800 mb-1">Permissions:</h4>
                  <ul className="list-disc list-inside text-blue-700">
                    {user?.role.permissions.map((permission, index) => (
                      <li key={index}>{permission}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Quick Stats</h3>
                    <p className="text-gray-600">View your account statistics</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Recent Activity</h3>
                    <p className="text-gray-600">Check your recent actions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Settings</h3>
                    <p className="text-gray-600">Manage your account settings</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </ProtectedComponent>
  );
} 