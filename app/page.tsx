import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, PieChart, ShoppingCart, Users, Package, Pill, Calendar } from "lucide-react"
import Link from "next/link"
import { DashboardMetricCard } from "@/components/dashboard-metric-card"
import { RecentSalesCard } from "@/components/recent-sales-card"
import { InventoryAlertCard } from "@/components/inventory-alert-card"
import { SalesChart } from "@/components/sales-chart"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Pill className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">Farmacia de Eber</span>
            </div>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Button variant="ghost" asChild>
                <Link href="#" className="text-sm font-medium">
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#" className="text-sm font-medium">
                  Inventario
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#" className="text-sm font-medium">
                  Ventas
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#" className="text-sm font-medium">
                  Clientes
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#" className="text-sm font-medium">
                  Reportes
                </Link>
              </Button>
            </nav>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Nueva Venta
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vista General</TabsTrigger>
              <TabsTrigger value="analytics">Analítica</TabsTrigger>
              <TabsTrigger value="reports">Reportes</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardMetricCard
                  title="Ventas Totales"
                  value="$12,345.67"
                  description="+20.1% desde el mes pasado"
                  icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
                />
                <DashboardMetricCard
                  title="Clientes Activos"
                  value="2,350"
                  description="+180 nuevos clientes"
                  icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                <DashboardMetricCard
                  title="Productos"
                  value="1,245"
                  description="86 con stock bajo"
                  icon={<Package className="h-4 w-4 text-muted-foreground" />}
                />
                <DashboardMetricCard
                  title="Recetas"
                  value="450"
                  description="32 pendientes"
                  icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Ventas Semanales</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <SalesChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Ventas Recientes</CardTitle>
                    <CardDescription>Últimas 5 transacciones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSalesCard />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Alertas de Inventario</CardTitle>
                    <CardDescription>Productos con stock bajo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryAlertCard />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver todos los productos
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Distribución de Ventas</CardTitle>
                    <CardDescription>Por categoría de producto</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center p-6">
                    <div className="h-60 w-60">
                      <PieChart className="h-full w-full text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
