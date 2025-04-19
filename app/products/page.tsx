import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search, Plus, Filter, ArrowUpDown } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">Farmacia de Eber</span>
            </div>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Button variant="ghost" asChild>
                <Link href="/" className="text-sm font-medium">
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/products" className="text-sm font-medium">
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
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
            <div className="flex items-center gap-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Producto
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Buscar productos..." className="w-full" />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Ordenar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="low-stock">Stock Bajo</TabsTrigger>
              <TabsTrigger value="prescription">Requieren Receta</TabsTrigger>
              <TabsTrigger value="expiring">Por Vencer</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Productos</CardTitle>
                  <CardDescription>Gestiona tu inventario de productos farmacéuticos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Paracetamol 500mg</TableCell>
                        <TableCell>PAR-500-001</TableCell>
                        <TableCell>Analgésicos</TableCell>
                        <TableCell className="text-right">$5.99</TableCell>
                        <TableCell className="text-right">15</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Stock Bajo</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Amoxicilina 250mg</TableCell>
                        <TableCell>AMX-250-002</TableCell>
                        <TableCell>Antibióticos</TableCell>
                        <TableCell className="text-right">$12.50</TableCell>
                        <TableCell className="text-right">8</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Stock Bajo</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Loratadina 10mg</TableCell>
                        <TableCell>LOR-010-003</TableCell>
                        <TableCell>Antialérgicos</TableCell>
                        <TableCell className="text-right">$7.25</TableCell>
                        <TableCell className="text-right">42</TableCell>
                        <TableCell>
                          <Badge variant="outline">Normal</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Omeprazol 20mg</TableCell>
                        <TableCell>OME-020-004</TableCell>
                        <TableCell>Antiácidos</TableCell>
                        <TableCell className="text-right">$9.75</TableCell>
                        <TableCell className="text-right">27</TableCell>
                        <TableCell>
                          <Badge variant="outline">Normal</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Insulina Lantus</TableCell>
                        <TableCell>INS-LAN-005</TableCell>
                        <TableCell>Diabetes</TableCell>
                        <TableCell className="text-right">$65.00</TableCell>
                        <TableCell className="text-right">3</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Stock Bajo</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
