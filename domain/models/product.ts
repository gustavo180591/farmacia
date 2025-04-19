import type { Category } from "./category"
import type { Supplier } from "./supplier"

export interface ProductProps {
  id: string
  name: string
  description: string
  sku: string
  barcode?: string
  price: number
  cost: number
  stock: number
  minStock: number
  maxStock: number
  location?: string
  category: Category
  supplier: Supplier
  requiresPrescription: boolean
  expiryDate?: Date
  createdAt: Date
  updatedAt: Date
}

// Entidad de Producto siguiendo principios de Domain-Driven Design
export class Product {
  private props: ProductProps

  constructor(props: ProductProps) {
    this.validateProps(props)
    this.props = props
  }

  // Getters
  get id(): string {
    return this.props.id
  }
  get name(): string {
    return this.props.name
  }
  get description(): string {
    return this.props.description
  }
  get sku(): string {
    return this.props.sku
  }
  get barcode(): string | undefined {
    return this.props.barcode
  }
  get price(): number {
    return this.props.price
  }
  get cost(): number {
    return this.props.cost
  }
  get stock(): number {
    return this.props.stock
  }
  get minStock(): number {
    return this.props.minStock
  }
  get maxStock(): number {
    return this.props.maxStock
  }
  get location(): string | undefined {
    return this.props.location
  }
  get category(): Category {
    return this.props.category
  }
  get supplier(): Supplier {
    return this.props.supplier
  }
  get requiresPrescription(): boolean {
    return this.props.requiresPrescription
  }
  get expiryDate(): Date | undefined {
    return this.props.expiryDate
  }
  get createdAt(): Date {
    return this.props.createdAt
  }
  get updatedAt(): Date {
    return this.props.updatedAt
  }

  // Métodos de negocio
  updateStock(quantity: number): void {
    const newStock = this.props.stock + quantity
    if (newStock < 0) {
      throw new Error("Stock cannot be negative")
    }
    this.props.stock = newStock
    this.props.updatedAt = new Date()
  }

  updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error("Price must be greater than zero")
    }
    this.props.price = newPrice
    this.props.updatedAt = new Date()
  }

  isLowStock(): boolean {
    return this.props.stock <= this.props.minStock
  }

  isOverStock(): boolean {
    return this.props.stock >= this.props.maxStock
  }

  getProfit(): number {
    return this.props.price - this.props.cost
  }

  getProfitMargin(): number {
    return (this.getProfit() / this.props.price) * 100
  }

  isExpired(): boolean {
    if (!this.props.expiryDate) return false
    return this.props.expiryDate < new Date()
  }

  // Validaciones
  private validateProps(props: ProductProps): void {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Product name is required")
    }

    if (props.price <= 0) {
      throw new Error("Price must be greater than zero")
    }

    if (props.cost < 0) {
      throw new Error("Cost cannot be negative")
    }

    if (props.stock < 0) {
      throw new Error("Stock cannot be negative")
    }

    if (props.minStock < 0) {
      throw new Error("Minimum stock cannot be negative")
    }

    if (props.maxStock <= props.minStock) {
      throw new Error("Maximum stock must be greater than minimum stock")
    }
  }

  // Factory Method (Patrón de Diseño)
  static create(props: Omit<ProductProps, "id" | "createdAt" | "updatedAt">): Product {
    const now = new Date()
    return new Product({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    })
  }
}
