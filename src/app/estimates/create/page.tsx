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

const estimateSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  estimateNumber: z.string().min(5, {
    message: "Estimate number must be at least 5 characters.",
  }),
  issueDate: z.date(),
  expiryDate: z.date(),
  items: z.array(
    z.object({
      description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),
      quantity: z.number().min(1, {
        message: "Quantity must be at least 1.",
      }),
      price: z.number().min(0, {
        message: "Price must be at least 0.",
      }),
    })
  ).min(1, {
    message: "At least one item is required.",
  }),
  notes: z.string().optional(),
});

export default function CreateEstimatePage() {
  const form = useForm<z.infer<typeof estimateSchema>>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      clientName: "",
      estimateNumber: "",
      issueDate: new Date(),
      expiryDate: new Date(),
      items: [{ description: "", quantity: 1, price: 0 }],
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof estimateSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Create Estimate</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Client Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimateNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimate Number</FormLabel>
                <FormControl>
                  <Input placeholder="Estimate Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
