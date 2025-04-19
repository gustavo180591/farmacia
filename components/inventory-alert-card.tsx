import { Badge } from "@/components/ui/badge"

export function InventoryAlertCard() {
  const lowStockItems = [
    { id: 1, name: "Paracetamol 500mg", stock: 15, threshold: 20, category: "Analgésicos" },
    { id: 2, name: "Amoxicilina 250mg", stock: 8, threshold: 15, category: "Antibióticos" },
    { id: 3, name: "Loratadina 10mg", stock: 5, threshold: 10, category: "Antialérgicos" },
    { id: 4, name: "Omeprazol 20mg", stock: 12, threshold: 25, category: "Antiácidos" },
    { id: 5, name: "Insulina Lantus", stock: 3, threshold: 5, category: "Diabetes" },
  ]

  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <div className="flex items-center gap-2">
              <Badge variant={item.stock <= item.threshold / 2 ? "destructive" : "outline"} className="text-xs">
                {item.stock} unidades
              </Badge>
              <span className="text-xs text-muted-foreground">{item.category}</span>
            </div>
          </div>
          <button className="text-sm text-emerald-600 hover:underline">Reabastecer</button>
        </div>
      ))}
    </div>
  )
}
