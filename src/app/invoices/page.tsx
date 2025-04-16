'use client';

import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

export default function InvoicesPage() {
  const [invoiceStatus, setInvoiceStatus] = useState('paid');

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <div>
          <Link href="/invoices/create">
            <Button variant="primary" className="mr-2">
              Create Invoice
            </Button>
          </Link>
          <Link href="/recurring-invoices/create">
            <Button variant="secondary">Create Recurring Invoice</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Example Invoice List - Replace with actual data */}
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Invoice #12345</h2>
              <p className="text-gray-500">Issued: 2024-07-15</p>
              <p className="text-gray-500">Due: 2024-08-15</p>
            </div>
            <div className="flex items-center">
              <Select
                value={invoiceStatus}
                onValueChange={setInvoiceStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="ml-2">
                {/* Replace with appropriate icon */}
                {/* <MoreHorizontalIcon className="h-4 w-4" /> */}
              </Button>
            </div>
          </div>
        </div>
        {/* Add more invoice items here */}
      </div>
    </div>
  );
}
