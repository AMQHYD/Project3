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
} from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$50,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoices Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <div className="grid grid-cols-1 gap-8">
        {/* Invoice Aging */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Aging</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Top Clients Chart */}
            <p>Top Clients Chart will be displayed here.</p>
          </CardContent>
        </Card>

        {/* Top Products/Services */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products/Services</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Top Products/Services Chart */}
            <p>Top Products/Services Chart will be displayed here.</p>
          </CardContent>
        </Card>

        {/* Revenue Report */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Report</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Revenue Report Chart */}
            <p>Revenue Report Chart will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
