"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useAuth } from '@/hooks/use-auth'; // Import useAuth hook

const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
    const { signIn, signUp } = useAuth(); // Use useAuth hook for sign-in and sign-up


  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

    async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true);

        try {
            await signIn(values.email, values.password);
            router.push("/dashboard");
        } catch (error: any) {
            loginForm.setError("email", {
                type: "manual",
                message: error.message || "Invalid credentials.",
            });
            loginForm.setError("password", {
                type: "manual",
                message: error.message || "Invalid credentials.",
            });
        }

        setIsLoading(false);
    }

    async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);

        if (values.password !== values.confirmPassword) {
            registerForm.setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match.",
            });
            setIsLoading(false);
            return;
        }

        try {
            await signUp(values.email, values.password);
            router.push(`/profile?newRegistration=true&email=${values.email}`); // Redirect to profile on successful registration
        } catch (error: any) {
            registerForm.setError("email", {
                type: "manual",
                message: error.message || "Registration failed.",
            });
        }


        setIsRegistering(false);
        setIsLoading(false);
    }

  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isRegistering ? "Register" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...(isRegistering ? registerForm : loginForm)}>
            <form
              onSubmit={
                isRegistering
                  ? registerForm.handleSubmit(onRegisterSubmit)
                  : loginForm.handleSubmit(onLoginSubmit)
              }
              className="space-y-4"
            >
              <FormField
                control={(isRegistering ? registerForm : loginForm).control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={(isRegistering ? registerForm : loginForm).control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                {isRegistering && (
                    <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
              {!isRegistering && (
                <div className="flex items-center justify-between">
                  <FormField
                    control={loginForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Remember Me
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    href="/forgot-password" // Replace with your forgot password route
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading
                  ? "Loading..."
                  : isRegistering
                  ? "Register"
                  : "Login"}
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
