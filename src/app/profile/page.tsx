"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobile: z.string().optional(),
  address: z.string().optional(),
  businessName: z.string().min(2, {
    message: "Business Name must be at least 2 characters.",
  }),
  logo: z.string().optional(),
  email: z.string().email({
      message: "Invalid email address.",
  }),
});

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const newRegistration = searchParams.get('newRegistration') === 'true';
  const initialEmail = searchParams.get('email') || '';
  const [isBusinessNameDisabled, setIsBusinessNameDisabled] = useState(!newRegistration);


  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
      businessName: "",
      logo: "",
      email: initialEmail,
    },
  });

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                form.setValue("logo", reader.result as string); // Set the logo value in the form
            };
            reader.readAsDataURL(file);
        }
    };

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    setIsBusinessNameDisabled(true);
  }

    useEffect(() => {
        if (newRegistration) {
            // Optionally set email as read-only
            form.setValue("email", initialEmail);
        } else {
            // Load existing profile data here.  Simulate data fetch
            const storedProfile = {
                name: "Existing User",
                mobile: "123-456-7890",
                address: "Existing Address",
                businessName: "Existing Business",
                logo: "https://picsum.photos/50/50",
                email: initialEmail,
            };
            form.setValue("name", storedProfile.name);
            form.setValue("mobile", storedProfile.mobile);
            form.setValue("address", storedProfile.address);
            form.setValue("businessName", storedProfile.businessName);
            form.setValue("logo", storedProfile.logo);
            form.setValue("email", storedProfile.email);
            setIsBusinessNameDisabled(true);
        }
    }, [newRegistration, initialEmail, form.setValue]);


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        {newRegistration && (
            <p className="text-sm text-gray-500 mb-4">
                Please complete your profile to get started.
            </p>
        )}
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-16 w-16">
          {form.getValues("logo") ? (
            <AvatarImage src={form.getValues("logo")} alt="Business Logo" />
          ) : (
            <AvatarFallback>
              {form.getValues("name")
                ? form.getValues("name").substring(0, 2).toUpperCase()
                : "CN"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} disabled={true} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name {isBusinessNameDisabled ? "(Cannot be changed)" : ""}</FormLabel>
                <FormControl>
                  <Input placeholder="Business Name" {...field} disabled={isBusinessNameDisabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Logo</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating Profile..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
