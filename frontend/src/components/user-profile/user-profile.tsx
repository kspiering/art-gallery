"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import React from "react";
import { DeleteButton } from "../buttons/delete-button";
import { EditButton } from "../buttons/edit-button";
import { useSession } from "next-auth/react";

// User Daten
interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
}

export default function UserProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Daten vom Backend API abrufen
  const getCurrentUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Keine Daten empfangen");
      }
      return await response.json();
    } catch (error) {
      console.error("Fehler beim Abrufen der User Daten:", error);
      return null;
    }
  };

  React.useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getCurrentUser()
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fehler im useEffect:", error);
        setIsLoading(false);
      });
  }, [session]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardContent>
            <div className="flex justify-center items-center h-32">
              <p>Keine Benutzerdaten gefunden.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUserUpdate = () => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Fehler beim Aktualisieren der Benutzerdaten:", error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Mein Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-500">Vorname: </label>
              <span className="font-semibold">{user.firstname}</span>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-500">Nachname: </label>
              <span className="font-semibold">{user.lastname}</span>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-500">Email: </label>
              <span className="font-semibold">{user.email}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end sm:flex-row sm:justify-end gap-4">
          <EditButton onUserUpdate={handleUserUpdate} userData={user} />
          <DeleteButton />
        </CardFooter>
      </Card>
    </div>
  );
}
