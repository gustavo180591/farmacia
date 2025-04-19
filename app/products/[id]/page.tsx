import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ArrowLeft, Save, Trash } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const isNewProduct = params.id === "new"

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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/products">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h2 className="text-3xl font-bold tracking-tight">
                {isNewProduct ? "Nuevo Producto" : "Editar Producto"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="inventory">Inventario</TabsTrigger>
              <TabsTrigger value="pricing">Precios</TabsTrigger>
              <TabsTrigger value="images">Imágenes</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                  <CardDescription>Detalles generales del producto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre del Producto</Label>
                      <Input
                        id="name"
                        placeholder="Ej: Paracetamol 500mg"
                        defaultValue={isNewProduct ? "" : "Paracetamol 500mg"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input id="sku" placeholder="Ej: PAR-500-001" defaultValue={isNewProduct ? "" : "PAR-500-001"} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      placeholder="Descripción detallada del producto..."
                      className="min-h-32"
                      defaultValue={
                        isNewProduct
                          ? ""
                          : "Analgésico y antipirético para el alivio temporal de dolores leves a moderados y reducción de la fiebre."
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select defaultValue={isNewProduct ? "" : "analgesicos"}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analgesicos">Analgésicos</SelectItem>
                          <SelectItem value="antibioticos">Antibióticos</SelectItem>
                          <SelectItem value="antialergicos">Antialérgicos</SelectItem>
                          <SelectItem value="antiacidos">Antiácidos</SelectItem>
                          <SelectItem value="diabetes">Diabetes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Proveedor</Label>
                      <Select defaultValue={isNewProduct ? "" : "proveedor1"}>
                        <SelectTrigger id="supplier">
                          <SelectValue placeholder="Seleccionar proveedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="proveedor1">Laboratorio Farmacéutico Nacional</SelectItem>
                          <SelectItem value="proveedor2">Distribuidora Médica Central</SelectItem>
                          <SelectItem value="proveedor3">Importadora Farmacéutica Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="prescription" defaultChecked={!isNewProduct} />
                    <Label htmlFor="prescription">Requiere receta médica</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Inventario</CardTitle>
                  <CardDescription>Configuración de stock y almacenamiento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Actual</Label>
                      <Input id="stock" type="number" min="0" defaultValue={isNewProduct ? "0" : "15"} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minStock">Stock Mínimo</Label>
                      <Input id="minStock" type="number" min="0" defaultValue={isNewProduct ? "10" : "20"} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxStock">Stock Máximo</Label>
                      <Input id="maxStock" type="number" min="0" defaultValue={isNewProduct ? "100" : "150"} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación en Almacén</Label>
                    <Input
                      id="location"
                      placeholder="Ej: Estante A, Sección 3"
                      defaultValue={isNewProduct ? "" : "Estante B, Sección 2"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barcode">Código de Barras</Label>
                    <Input
                      id="barcode"
                      placeholder="Ej: 7501234567890"
                      defaultValue={isNewProduct ? "" : "7501234567890"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                    <Input id="expiryDate" type="date" defaultValue={isNewProduct ? "" : "2025-12-31"} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Precios</CardTitle>
                  <CardDescription>Configuración de precios y costos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cost">Costo de Adquisición ($)</Label>
                      <Input
                        id="cost"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={isNewProduct ? "0.00" : "3.50"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Precio de Venta ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={isNewProduct ? "0.00" : "5.99"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tasa de Impuesto (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={isNewProduct ? "16.00" : "16.00"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discount">Descuento (%)</Label>
                      <Input
                        id="discount"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        defaultValue={isNewProduct ? "0.00" : "0.00"}
                      />
                    </div>
                  </div>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Margen de Ganancia</p>
                          <p className="text-2xl font-bold">41.57%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Ganancia por Unidad</p>
                          <p className="text-2xl font-bold">$2.49</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
