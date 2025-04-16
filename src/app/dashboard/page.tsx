"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const revenueData = [
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2390 },
  { name: "Jul", uv: 3490 },
  { name: "Aug", uv: 4000 },
  { name: "Sep", uv: 3000 },
  { name: "Oct", uv: 2000 },
  { name: "Nov", uv: 2780 },
  { name: "Dec", uv: 1890 },
  { name: "Jan", uv: 2390 },
];

const invoiceStatusData = [
  { name: "Paid", value: 25, color: "#22c55e" },
  { name: "Pending", value: 33, color: "#facc15" },
  { name: "Overdue", value: 17, color: "#ef4444" },
  { name: "Draft", value: 25, color: "#cbd5e0" },
];

const topClientsData = [
  { name: "Global Enterprises", value: 6181.25, color: "#3b82f6" },
  { name: "Restaurant Chain", value: 4563.38, color: "#3b82f6" },
];

export default function DashboardPage() {

  const generatePdf = () => {
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [['Report', 'Value']],
      body: [
        ['Total Revenue', '$48,662.00'],
        ['Pending Revenue', '$40,353.13'],
        ['Overdue Revenue', '$14,012.63'],
        ['Invoice Status - Paid', '25%'],
        ['Invoice Status - Pending', '33%'],
        ['Invoice Status - Overdue', '17%'],
        ['Invoice Status - Draft', '25%'],
        ['Top Client - Global Enterprises', '$6181.25'],
        ['Top Client - Restaurant Chain', '$4563.38'],
        ['Invoice Aging', 'No data available'],
        ['Monthly Revenue Trends', 'Not available yet'],
        ['Revenue by Product', 'Not available'],
        ['Payment Performance', 'Track average payment times'],
        ['Period Comparison', 'Compare data between periods'],
        ['Client Activity', 'View client interaction history'],
      ],
    });
    doc.save('reports.pdf');
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2">
          <Button>Advanced Reports</Button>
          <Button variant="outline" size="icon" onClick={generatePdf}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardContent>
                <div className="text-xl font-bold">Total Revenue</div>
                <div className="text-2xl font-bold">$48,662.00</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-xl font-bold">Pending Revenue</div>
                <div className="text-2xl font-bold">$40,353.13</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-xl font-bold">Overdue Revenue</div>
                <div className="text-2xl font-bold">$14,012.63</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={invoiceStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col items-start mt-4">
              {invoiceStatusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Top Clients</CardTitle>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="This Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topClientsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Aging */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Invoice Aging</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No invoice aging data available.</p>
          <p className="text-sm text-gray-500">Create and send invoices to track payment status over time.</p>
        </CardContent>
      </Card>

      {/* Monthly Revenue Trends */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Monthly Revenue Trends</CardTitle>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="This Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <p>Monthly revenue comparison not available yet.</p>
          <p className="text-sm text-gray-500">Create invoices over multiple months to see monthly trends.</p>
        </CardContent>
      </Card>

      {/* Revenue by Product */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Revenue by Product</CardTitle>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="This Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <p>Product revenue breakdown not available.</p>
          <p className="text-sm text-gray-500">Add products to invoices to see which generate the most revenue.</p>
        </CardContent>
      </Card>

      {/* Additional Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent>
            <div className="text-xl font-bold">Payment Performance</div>
            <p className="text-sm text-gray-500">Track average payment times</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-xl font-bold">Period Comparison</div>
            <p className="text-sm text-gray-500">Compare data between periods</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-xl font-bold">Client Activity</div>
            <p className="text-sm text-gray-500">View client interaction history</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
