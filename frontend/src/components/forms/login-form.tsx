"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { FormContext } from "@/types/enums/form-context";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  setFormContext: (context: FormContext) => void;
}

const loginFormSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  password: z
    .string()
    .min(4, {
      message: "Passwort muss mindestens 4 Zeichen lang sein",
    })
    .max(20, {
      message: "Passwort muss höchstens 20 Zeichen lang sein",
    }),
});

export const LoginForm = ({ setFormContext }: LoginFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // next-auth's handleLogin
    // heisst signIn()
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      toast.error(
        "Login fehlgeschlagen, bitte versuchen Sie es erneut oder registrieren Sie sich",
        {
          position: "bottom-center",
        }
      );
    } else {
      toast.success("Login erfolgreich", { position: "bottom-center" });
      router.push("/");
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
            name="email"
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input
                  className="border-purple-400"
                  placeholder="Email"
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
                  placeholder="Password"
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
            Anmelden
          </Button>
        </form>
      </Form>
      <div className="mt-6 md:mt-4 text-center md:text-right">
        <p className="text-sm md:text-xs text-gray-600">
          Noch kein Account?{" "}
          <button
            onClick={() => setFormContext(FormContext.REGISTER)}
            className="font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            type="button"
          >
            Jetzt registrieren
          </button>
        </p>
      </div>
    </div>
  );
};
