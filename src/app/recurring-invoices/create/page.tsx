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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldArray } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

const recurringInvoiceSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  name: z.string().optional(),
  frequency: z.enum(["weekly", "monthly", "yearly"]),
  dayOfMonth: z.number().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  limit: z.number().optional(),
  paymentTerms: z.string().optional(),
  items: z.array(
    z.object({
      description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),
      quantity: z.number().min(1, {
        message: "Quantity must be at least 1.",
      }),
      unitPrice: z.number().min(0, {
        message: "Price must be at least 0.",
      }),
    })
  ).min(1, {
    message: "At least one item is required.",
  }),
  notes: z.string().optional(),
  terms: z.string().optional(),
  automaticallySend: z.boolean().default(false),
});

export default function CreateRecurringInvoicePage() {
  const form = useForm<z.infer<typeof recurringInvoiceSchema>>({
    resolver: zodResolver(recurringInvoiceSchema),
    defaultValues: {
      clientName: "",
      name: "",
      frequency: "monthly",
      dayOfMonth: 0,
      startDate: new Date(),
      endDate: undefined,
      limit: undefined,
      paymentTerms: "Due 30 days after generation",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      notes: "",
      terms: "",
      automaticallySend: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(values: z.infer<typeof recurringInvoiceSchema>) {
    console.log(values);
  }

  const calculateTotal = () => {
    let total = 0;
    fields.forEach((item, index) => {
      const quantity = form.getValues(`items.${index}.quantity`) || 0;
      const price = form.getValues(`items.${index}.unitPrice`) || 0;
      total += quantity * price;
    });
    return total.toFixed(2);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">New Recurring Invoice</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client *</FormLabel>
                    <FormControl>
                      <Input placeholder="Select a client" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Monthly Website Maintenance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dayOfMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day of Month</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3">
                      <FormLabel>Start Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3">
                      <FormLabel>End Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Max number of invoices" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <FormControl>
                        <Input placeholder="Due 30 days after generation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="automaticallySend"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Automatically send invoice to client when generated</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Items</FormLabel>
                {fields.map((item, index) => (
                  <div key={item.id} className="flex space-x-2 mb-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.description` as const}
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity` as const}
                      render={({ field }) => (
                        <FormItem className="w-1/4">
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Quantity" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.unitPrice` as const}
                      render={({ field }) => (
                        <FormItem className="w-1/4">
                          <FormLabel>Unit Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Unit Price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    append({ description: "", quantity: 1, unitPrice: 0 })
                  }
                >
                  Add Item
                </Button>
              </div>
              <div className="text-xl font-bold">
                Total: ${calculateTotal()}
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter notes visible to your client" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Terms &amp; Conditions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your terms and conditions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Recurring Invoice</Button>
            </form>
          </Form>
        </div>
        <div>
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <div>
              <h4 className="text-md font-semibold">INVOICE DETAILS</h4>
              <p>Client: Not selected</p>
              <p>Frequency: {form.getValues("frequency")}</p>
              <p>Starts: {form.getValues("startDate") ? format(form.getValues("startDate"), "PPP") : ''}</p>
              <p>Ends: {form.getValues("endDate") ? format(form.getValues("endDate"), "PPP") : 'No end date'}</p>
              <p>Next Generation: May 13, 2025</p>
              <p>Payment Terms: Net 30 days</p>
            </div>
            <div className="mt-4">
              <h4 className="text-md font-semibold">AMOUNT SUMMARY</h4>
              <p>Subtotal: $0.00</p>
              <p>Tax: $0.00</p>
              <p>Total: ${calculateTotal()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
