import { Product } from "@/domain/models/product"
import type { ProductRepository } from "@/domain/repositories/product-repository"
import type { Category } from "@/domain/models/category"
import type { Supplier } from "@/domain/models/supplier"

// DTO para la entrada
interface CreateProductDTO {
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
  categoryId: string
  supplierId: string
  requiresPrescription: boolean
  expiryDate?: Date
}

// DTO para la salida
interface CreateProductResponse {
  id: string
  name: string
  sku: string
}

// Caso de uso siguiendo el principio de responsabilidad única (SRP)
export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private getCategoryById: (id: string) => Promise<Category>,
    private getSupplierById: (id: string) => Promise<Supplier>,
  ) {}

  async execute(data: CreateProductDTO): Promise<CreateProductResponse> {
    // Validar que el SKU no exista
    const existingProduct = await this.productRepository.findBySku(data.sku)
    if (existingProduct) {
      throw new Error(`Product with SKU ${data.sku} already exists`)
    }

    // Obtener la categoría y el proveedor
    const category = await this.getCategoryById(data.categoryId)
    if (!category) {
      throw new Error(`Category with ID ${data.categoryId} not found`)
    }

    const supplier = await this.getSupplierById(data.supplierId)
    if (!supplier) {
      throw new Error(`Supplier with ID ${data.supplierId} not found`)
    }

    // Crear el producto usando el Factory Method
    const product = Product.create({
      name: data.name,
      description: data.description,
      sku: data.sku,
      barcode: data.barcode,
      price: data.price,
      cost: data.cost,
      stock: data.stock,
      minStock: data.minStock,
      maxStock: data.maxStock,
      location: data.location,
      category,
      supplier,
      requiresPrescription: data.requiresPrescription,
      expiryDate: data.expiryDate,
    })

    // Guardar el producto
    await this.productRepository.save(product)

    // Retornar respuesta
    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
    }
  }
}
