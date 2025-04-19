import type { Product } from "../models/product"

// Interfaz del repositorio siguiendo el patrón Repository
export interface ProductRepository {
  findById(id: string): Promise<Product | null>
  findByBarcode(barcode: string): Promise<Product | null>
  findBySku(sku: string): Promise<Product | null>
  findAll(): Promise<Product[]>
  findByCategory(categoryId: string): Promise<Product[]>
  findBySupplier(supplierId: string): Promise<Product[]>
  findLowStock(): Promise<Product[]>
  findExpiringSoon(days: number): Promise<Product[]>
  save(product: Product): Promise<void>
  delete(id: string): Promise<void>
}
