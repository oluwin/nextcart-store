"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import { AreaChart, BarChart, PieChart } from "@/components/components/charts";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";

import { useEffect, useState } from "react";
import { dummyAuth } from "@/components/lib/auth";
import { Activity, DollarSign, TrendingUpIcon, Users } from "lucide-react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  // if (!dummyAuth.isAuthenticated()) {
  //     redirect('/login')
  // }

  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (!dummyAuth.isAuthenticated()) {
      redirect("/login");
    }
    const currentUser = dummyAuth.currentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    dummyAuth.logout();
    setUser(null);
    window.location.href = "/login";
  };

  // Dummy data
  const stats = [
    {
      title: "Total Revenue",
      value: "₦45,231",
      change: "+20.1%",
      icon: DollarSign,
    },
    { title: "Subscriptions", value: "1,250", change: "+12%", icon: Users },
    { title: "Active Users", value: "573", change: "+5.3%", icon: Activity },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.8%",
      icon: TrendingUpIcon,
    },
  ];

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 2780 },
    { month: "May", sales: 1890 },
    { month: "Jun", sales: 2390 },
  ];

  const trafficSources = [
    { name: "Direct", value: 35 },
    { name: "Organic", value: 25 },
    { name: "Social", value: 20 },
    { name: "Referral", value: 15 },
    { name: "Email", value: 5 },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      status: "Delivered",
      date: "2023-06-12",
      amount: "₦125.00",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      status: "Processing",
      date: "2023-06-11",
      amount: "₦89.99",
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      status: "Shipped",
      date: "2023-06-10",
      amount: "₦234.50",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      status: "Delivered",
      date: "2023-06-09",
      amount: "₦56.75",
    },
    {
      id: "ORD-005",
      customer: "Robert Wilson",
      status: "Cancelled",
      date: "2023-06-08",
      amount: "₦199.99",
    },
  ];

  const activities = [
    {
      user: "John Smith",
      action: "placed an order",
      time: "2 minutes ago",
      avatar: "./images/avatar/01.jpg",
    },
    {
      user: "Sarah Johnson",
      action: "updated profile",
      time: "1 hour ago",
      avatar: "./images/avatar/02.jpg",
    },
    {
      user: "Admin",
      action: "added new product",
      time: "3 hours ago",
      avatar: "./images/avatar/03.png",
    },
    {
      user: "System",
      action: "completed backup",
      time: "5 hours ago",
      avatar: "./images/avatar/04.jpg",
    },
  ];

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          Welcome {user?.username || "Guest"}
        </h1>
        <div className="mt-4">
          <p>You are logged in as: {user?.username}</p>
          <Button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 rounded-full bg-red-500 text-white"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart data={salesData} xKey="month" yKey="sales" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-0">
            <PieChart
              data={trafficSources}
              nameKey="name"
              valueKey="value"
              className="h-[300px] w-full"
            />
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">View All Orders</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.user}{" "}
                    <span className="text-muted-foreground font-normal">
                      {activity.action}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Section */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={[
              { name: "Page A", value: 4000 },
              { name: "Page B", value: 3000 },
              { name: "Page C", value: 2000 },
              { name: "Page D", value: 2780 },
              { name: "Page E", value: 1890 },
            ]}
            xKey="name"
            yKey="value"
          />
        </CardContent>
      </Card>
    </div>
  );
}
