"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFieldArray } from "react-hook-form";

const invoiceSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  invoiceNumber: z.string().min(5, {
    message: "Invoice number must be at least 5 characters.",
  }),
  issueDate: z.date(),
  dueDate: z.date(),
  items: z.array(
    z.object({
      product: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
      }),
      description: z.string().optional(),
      quantity: z.number().min(1, {
        message: "Quantity must be at least 1.",
      }),
      price: z.number().min(0, {
        message: "Price must be at least 0.",
      }),
      tax: z.number().min(0, {
        message: "Tax must be at least 0.",
      }).max(100, {
        message: "Tax must be at most 100.",
      }).optional(),
    })
  ).min(1, {
    message: "At least one item is required.",
  }),
  notes: z.string().optional(),
  terms: z.string().optional(),
  template: z.enum(["template1", "template2"]),
});

export default function CreateInvoicePage() {
  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientName: "",
      invoiceNumber: "",
      issueDate: new Date(),
      dueDate: new Date(),
      items: [{ product: "", description: "", quantity: 1, price: 0, tax: 0 }],
      notes: "",
      terms: "",
      template: "template1",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  function onSubmit(values: z.infer<typeof invoiceSchema>) {
    console.log(values);
    setOpen(true);
  }

    const calculateTotal = () => {
        let total = 0;
        fields.forEach((item, index) => {
            const quantity = Number(form.getValues(`items.${index}.quantity`)) || 0;
            const price = Number(form.getValues(`items.${index}.price`)) || 0;
            const taxRate = Number(form.getValues(`items.${index}.tax`)) || 0;
            const itemTotal = quantity * price;
            const taxAmount = itemTotal * (taxRate / 100);
            total += itemTotal + taxAmount;
        });
        return total.toFixed(2);
    };


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Create Invoice</h1>
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
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input placeholder="Invoice Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Issue Date</FormLabel>
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
                      disabled={(date) => date > new Date()}
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
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Due Date</FormLabel>
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
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                  name={`items.${index}.product` as const}
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Product</FormLabel>
                      <FormControl>
                        <Input placeholder="Product" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.description` as const}
                  render={({ field }) => (
                    <FormItem className="w-1/4">
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
                    <FormItem className="w-1/8">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.price` as const}
                  render={({ field }) => (
                    <FormItem className="w-1/8">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.tax` as const}
                  render={({ field }) => (
                    <FormItem className="w-1/8">
                      <FormLabel>Tax (%)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Tax" {...field} />
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
                append({ product: "", description: "", quantity: 1, price: 0, tax: 0 })
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
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="template1">Template 1</SelectItem>
                    <SelectItem value="template2">Template 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Preview Invoice</Button>
        </form>
      </Form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>
              This is a preview of your invoice. Please review it before
              submitting.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {/* Display Invoice Preview Here - Replace with actual invoice data */}
            <p>Client Name: {form.getValues("clientName")}</p>
            <p>Invoice Number: {form.getValues("invoiceNumber")}</p>
            <p>Issue Date: {form.getValues("issueDate") ? format(form.getValues("issueDate"), "PPP") : ''}</p>
            <p>Due Date: {form.getValues("dueDate") ? format(form.getValues("dueDate"), "PPP") : ''}</p>
              <p>Total: ${calculateTotal()}</p>
            {/* Add more invoice details here */}
          </div>
          <Button type="submit">Submit Invoice</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
