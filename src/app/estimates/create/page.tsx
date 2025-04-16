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
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
    DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFieldArray } from "react-hook-form";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

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

export default function CreateEstimatePage() {
  const form = useForm<z.infer<typeof estimateSchema>>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      clientName: "",
      estimateNumber: "",
      issueDate: new Date(),
      expiryDate: new Date(),
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
    const [profile, setProfile] = useState({
        name: "",
        mobile: "",
        address: "",
        businessName: "",
        logo: "",
    });

    useEffect(() => {
        // Simulate fetching profile data.  Replace with actual data fetch.
        const storedProfile = {
            name: "John Doe",
            mobile: "123-456-7890",
            address: "123 Main St, Anytown",
            businessName: "Acme Corp",
            logo: "https://picsum.photos/50/50",  // Or null if no logo
        };
        setProfile(storedProfile);
    }, []);


  const onSubmit = (values: z.infer<typeof estimateSchema>) => {
    console.log(values);
    setOpen(true);
  };

    const calculateTotal = () => {
        let total = 0;
        fields.forEach((item, index) => {
            const quantity = form.getValues(`items.${index}.quantity`) || 0;
            const price = form.getValues(`items.${index}.price`) || 0;
            const taxRate = form.getValues(`items.${index}.tax`) || 0;
            const itemTotal = quantity * price;
            const taxAmount = itemTotal * (taxRate / 100);
            total += itemTotal + taxAmount;
        });
        return total.toFixed(2);
    };

    const submitEstimate = () => {
        // Implement estimate submission logic here
        console.log("Estimate submitted!");
        setOpen(false); // Close the dialog after submission
    };

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
                      selected={field.value ? field.value : undefined}
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
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Expiry Date</FormLabel>
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
                      selected={field.value ? field.value : undefined}
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
                name="terms"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Terms and Conditions</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Terms and Conditions" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
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
          <Button type="submit">Preview Estimate</Button>
        </form>
      </Form>
          <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Estimate Preview</DialogTitle>
            <DialogDescription>
              This is a preview of your estimate. Please review it before submitting.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
              {/* Display Invoice Preview Here - Replace with actual invoice data */}
              <div className="flex items-center space-x-4 mb-6">
                  {profile.logo ? (
                      <Avatar className="h-16 w-16">
                          <AvatarImage src={profile.logo} alt="Business Logo" />
                      </Avatar>
                  ) : (
                      <Avatar className="h-16 w-16">
                          <AvatarFallback>
                              {profile.name
                                  ? profile.name.substring(0, 2).toUpperCase()
                                  : "CN"}
                          </AvatarFallback>
                      </Avatar>
                  )}
                  <div>
                      <p className="text-lg font-semibold">{profile.businessName || "Your Business"}</p>
                      <p className="text-sm text-gray-500">{profile.address || "Your Address"}</p>
                  </div>
              </div>
            <p>Client Name: {form.getValues("clientName")}</p>
            <p>Estimate Number: {form.getValues("estimateNumber")}</p>
            <p>Issue Date: {form.getValues("issueDate") ? format(form.getValues("issueDate"), "PPP") : ''}</p>
            <p>Expiry Date: {form.getValues("expiryDate") ? format(form.getValues("expiryDate"), "PPP") : ''}</p>
              <p>Total: ${calculateTotal()}</p>
              <p>Terms and Conditions: {form.getValues("terms")}</p>
            {/* Add more estimate details here */}
          </div>
            <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                    Edit
                </Button>
                <Button type="button" onClick={submitEstimate}>
                    Submit Estimate
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
