import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹45,23,189",
      description: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "+2350",
      description: "+180.1% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: "12",
      description: "Total products in store",
      icon: Package,
    },
    {
      title: "Customers",
      value: "573",
      description: "+21 since last hour",
      icon: Users,
    },
  ];

  return (
    <>
      <Breadcrumb className="hidden md:flex mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to show.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
