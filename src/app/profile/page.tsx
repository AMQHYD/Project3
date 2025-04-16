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
import { useAuth } from '@/hooks/use-auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();


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

    const [selectedImage, setSelectedImage] = useState<File | null>(null); // Store the File object
    const [logoURL, setLogoURL] = useState<string | null>(null);  // For preview and initial value


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            // Create a preview URL
            setLogoURL(URL.createObjectURL(file));
        }
    };


    async function onSubmit(values: z.infer<typeof profileSchema>) {
        setIsLoading(true);

        try {
            if (!user) {
                throw new Error("User not authenticated.");
            }

            let logoUrl = null;
            if (selectedImage) {
                const storageRef = ref(storage, `logos/${user.uid}/${selectedImage.name}`);
                const snapshot = await uploadBytes(storageRef, selectedImage);
                logoUrl = await getDownloadURL(snapshot.ref);
            }

            const profileData = {
                ...values,
                logo: logoUrl || values.logo || "", // Use the new logo URL if available
            };

            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                await updateDoc(userDocRef, profileData);
            } else {
                await setDoc(userDocRef, profileData);
            }


            setIsBusinessNameDisabled(true);

            console.log("Profile updated successfully");
        } catch (error: any) {
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        const loadProfile = async () => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as z.infer<typeof profileSchema>;
                    form.setValue("name", data.name);
                    form.setValue("mobile", data.mobile || "");
                    form.setValue("address", data.address || "");
                    form.setValue("businessName", data.businessName);
                    form.setValue("logo", data.logo || "");  // Setting the initial logo URL
                    setLogoURL(data.logo || null);
                    form.setValue("email", data.email);
                    setIsBusinessNameDisabled(true);
                } else if (newRegistration && initialEmail) {
                    form.setValue("email", initialEmail);
                }
            }
        };

        loadProfile();
    }, [user, form.setValue, newRegistration, initialEmail]);


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
              {logoURL ? ( // Use logoURL for display
                  <AvatarImage src={logoURL} alt="Business Logo" />
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
