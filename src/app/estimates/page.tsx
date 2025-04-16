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
import {ScrollArea} from "@/components/ui/scroll-area";

export default function EstimatesPage() {
  const [estimateStatus, setEstimateStatus] = useState('draft');

  const estimates = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    number: `6789${i + 1}`,
    issued: '2024-07-20',
    expiry: '2024-08-20',
  }));

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Estimates</h1>
        <div>
          <Link href="/estimates/create">
            <Button variant="default">Create Estimate</Button>
          </Link>
        </div>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border">
        <div className="grid grid-cols-1 gap-4 p-4">
          {estimates.map(estimate => (
            <div
              key={estimate.id}
              className="bg-white rounded-md shadow-sm p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    Estimate #{estimate.number}
                  </h2>
                  <p className="text-gray-500">Issued: {estimate.issued}</p>
                  <p className="text-gray-500">Expiry: {estimate.expiry}</p>
                </div>
                <div className="flex items-center">
                  <Select
                    value={estimateStatus}
                    onValueChange={setEstimateStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="ml-2">
                    {/* Replace with appropriate icon */}
                    {/* <MoreHorizontalIcon className="h-4 w-4" /> */}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
