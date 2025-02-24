"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export const EditButton = ({
  onUserUpdate,
  userData,
}: {
  onUserUpdate: () => void;
  userData: {
    firstname: string;
    lastname: string;
    email: string;
  };
}) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [formData, setFormData] = useState({
    firstname: userData.firstname || "",
    lastname: userData.lastname || "",
    email: userData.email || "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Erstelle ein neues Objekt mit den Basisdaten
    const updateData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
    };

    // Füge Passwort nur hinzu, wenn es eingegeben wurde
    if (formData.password) {
      Object.assign(updateData, {
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
    }

    try {
      const response = await fetch(`http://localhost:8000/api/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Accounts");
      }

      setIsEditing(false);
      onUserUpdate();
      toast.success("Account erfolgreich aktualisiert!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Fehler:", error);
      toast.error("Es gab einen Fehler beim Aktualisieren des Accounts", {
        position: "bottom-center",
      });
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center justify-center w-28 h-10 md:w-32 md:h-10 px-4 py-1.5 bg-blue-400 hover:bg-blue-500 text-white rounded-full text-sm transition-colors"
      >
        Bearbeiten
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-10 flex items-center justify-center">
      <form
        onSubmit={handleUpdate}
        className="space-y-4 p-4 bg-[#fffbf1] rounded-lg shadow w-[90%] sm:w-[500px] max-w-[500px]"
      >
        <div>
          <input
            type="text"
            name="firstname"
            placeholder="Vorname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            placeholder="Nachname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border rounded"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border rounded"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Neues Passwort"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showPasswordConfirmation ? "text" : "password"}
            name="password_confirmation"
            placeholder="Passwort bestätigen"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border rounded"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPasswordConfirmation ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
          >
            Speichern
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors cursor-pointer"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};
