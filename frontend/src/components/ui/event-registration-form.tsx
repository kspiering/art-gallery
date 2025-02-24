import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface RegistrationFormProps {
  eventId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function EventRegistrationForm({
  eventId,
  isOpen,
  onClose,
}: RegistrationFormProps) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch(`http://localhost:8000/api/user`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          const userData = await response.json();
          setFormData({
            email: userData.email,
            firstName: userData.firstname,
            lastName: userData.lastname,
          });
        } catch (error) {
          console.error("Fehler beim Laden der Benutzerdaten:", error);
        }
      }
    };

    if (session) {
      setIsLoggedIn(true);
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/eventRegistrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`, // Authorization Header hinzugefügt
          },
          body: JSON.stringify({
            event_id: eventId,
            email: formData.email,
            firstname: formData.firstName,
            lastname: formData.lastName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Anmeldung fehlgeschlagen."); // Geändert zu data.message
      }

      toast.success("Erfolgreich für das Event angemeldet!", {
        position: "bottom-center",
      });
      onClose();
    } catch (error: any) {
      setError(error.message || "Ein Fehler ist aufgetreten");
      toast.error(error.message || "Ein Fehler ist aufgetreten"); // Fehlermeldung auch als Toast anzeigen
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[320px] md:w-[380px] mx-auto bg-[#fffbf1] shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle>Für Event anmelden</DialogTitle>
          <DialogDescription>
            {isLoggedIn
              ? "Bitte füllen Sie das Formular aus, um sich für dieses Event zu registrieren."
              : "Bitte erstellen Sie ein Konto um sich anzumelden. Wenn Sie bereits ein Konto haben, melden Sie sich bitte an."}
          </DialogDescription>
        </DialogHeader>

        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wird angemeldet..." : "Anmelden"}
            </Button>
          </form>
        ) : (
          <div className="flex justify-center space-y-2">
            <Link
              href={"/session"}
              className="text-white font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#8EAD84] hover:bg-[#5C8251]  text-white shadow h-10 w-32 px-8"
            >
              Login
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
