"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormInput } from "./form-input";
import { FormContext } from "@/types/enums/form-context";
import { toast } from "sonner";

interface RegisterFormProps {
  setFormContext: (context: FormContext) => void;
}

const registerFormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "Vorname muss mindestens 2 Zeichen lang sein."),
    lastname: z
      .string()
      .min(2, "Nachname muss mindestens 2 Zeichen lang sein."),
    email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
    password: z
      .string()
      .min(4, {
        message: "Das Passwort muss mindestens 4 Zeichen lang sein.",
      })
      .max(20, {
        message: "Das Passwort darf maximal 20 Zeichen lang sein.",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["password_confirmation"],
  });

export const RegisterForm = ({ setFormContext }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
          firstname: values.firstname,
          lastname: values.lastname,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Registrierung erfolgreich, Sie können sich jetzt anmelden",
          {
            position: "bottom-center",
          }
        );
        setFormContext(FormContext.LOGIN);
      } else {
        toast.error(data.message || "Registrierung fehlgeschlagen", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error("Ein Fehler ist aufgetreten", {
        position: "bottom-center",
      });
    }
  }

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-6"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input
                  className="border-purple-400"
                  placeholder="Vorname"
                  {...field}
                />
              </FormInput>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input
                  className="border-purple-400"
                  placeholder="Nachname"
                  {...field}
                />
              </FormInput>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input
                  className="border-purple-400"
                  placeholder="Email"
                  type="email"
                  {...field}
                />
              </FormInput>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input
                  className="border-purple-400"
                  type="password"
                  placeholder="Passwort"
                  {...field}
                />
              </FormInput>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input
                  className="border-purple-400"
                  type="password"
                  placeholder="Passwort wiederholen"
                  {...field}
                />
              </FormInput>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#8EAD84] hover:bg-[#5C8251]  text-white rounded-full text-sm transition-colors"
          >
            Registrieren
          </Button>
        </form>
      </Form>
      <div className="mt-6 md:mt-4 text-center md:text-right">
        <p className="text-sm md:text-xs text-gray-600">
          Bereits ein Account?{" "}
          <button
            onClick={() => setFormContext(FormContext.LOGIN)}
            className="font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            type="button"
          >
            Jetzt anmelden
          </button>
        </p>
      </div>
    </div>
  );
};
