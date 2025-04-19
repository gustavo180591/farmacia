import { Product, type ProductProps } from "@/domain/models/product"
import type { ProductRepository } from "@/domain/repositories/product-repository"
import { Category } from "@/domain/models/category"
import { Supplier } from "@/domain/models/supplier"
import { db } from "../database/connection"

// Implementación del repositorio usando el patrón Adapter
export class ProductRepositoryImpl implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    try {
      // Simulación de consulta a base de datos
      const productData = await db.products.findUnique({
        where: { id },
        include: { category: true, supplier: true },
      })

      if (!productData) return null

      return this.mapToProduct(productData)
    } catch (error) {
      console.error("Error finding product by ID:", error)
      throw new Error("Failed to find product")
    }
  }

  async findByBarcode(barcode: string): Promise<Product | null> {
    try {
      const productData = await db.products.findUnique({
        where: { barcode },
        include: { category: true, supplier: true },
      })

      if (!productData) return null

      return this.mapToProduct(productData)
    } catch (error) {
      console.error("Error finding product by barcode:", error)
      throw new Error("Failed to find product")
    }
  }

  async findBySku(sku: string): Promise<Product | null> {
    try {
      const productData = await db.products.findUnique({
        where: { sku },
        include: { category: true, supplier: true },
      })

      if (!productData) return null

      return this.mapToProduct(productData)
    } catch (error) {
      console.error("Error finding product by SKU:", error)
      throw new Error("Failed to find product")
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const productsData = await db.products.findMany({
        include: { category: true, supplier: true },
      })

      return productsData.map(this.mapToProduct)
    } catch (error) {
      console.error("Error finding all products:", error)
      throw new Error("Failed to find products")
    }
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    try {
      const productsData = await db.products.findMany({
        where: { categoryId },
        include: { category: true, supplier: true },
      })

      return productsData.map(this.mapToProduct)
    } catch (error) {
      console.error("Error finding products by category:", error)
      throw new Error("Failed to find products")
    }
  }

  async findBySupplier(supplierId: string): Promise<Product[]> {
    try {
      const productsData = await db.products.findMany({
        where: { supplierId },
        include: { category: true, supplier: true },
      })

      return productsData.map(this.mapToProduct)
    } catch (error) {
      console.error("Error finding products by supplier:", error)
      throw new Error("Failed to find products")
    }
  }

  async findLowStock(): Promise<Product[]> {
    try {
      // Consulta optimizada usando índices
      const productsData = await db.products.findMany({
        where: {
          stock: {
            lte: db.raw("minStock"), // Usando expresión raw para comparar con otro campo
          },
        },
        include: { category: true, supplier: true },
      })

      return productsData.map(this.mapToProduct)
    } catch (error) {
      console.error("Error finding low stock products:", error)
      throw new Error("Failed to find products")
    }
  }

  async findExpiringSoon(days: number): Promise<Product[]> {
    try {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + days)

      const productsData = await db.products.findMany({
        where: {
          expiryDate: {
            not: null,
            lte: futureDate,
          },
        },
        include: { category: true, supplier: true },
      })

      return productsData.map(this.mapToProduct)
    } catch (error) {
      console.error("Error finding expiring products:", error)
      throw new Error("Failed to find products")
    }
  }

  async save(product: Product): Promise<void> {
    try {
      // Convertir el objeto de dominio a formato de persistencia
      const productData = {
        id: product.id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        barcode: product.barcode,
        price: product.price,
        cost: product.cost,
        stock: product.stock,
        minStock: product.minStock,
        maxStock: product.maxStock,
        location: product.location,
        categoryId: product.category.id,
        supplierId: product.supplier.id,
        requiresPrescription: product.requiresPrescription,
        expiryDate: product.expiryDate,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }

      // Upsert para crear o actualizar
      await db.products.upsert({
        where: { id: product.id },
        update: productData,
        create: productData,
      })
    } catch (error) {
      console.error("Error saving product:", error)
      throw new Error("Failed to save product")
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.products.delete({
        where: { id },
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      throw new Error("Failed to delete product")
    }
  }

  // Método auxiliar para mapear datos de la BD a objetos de dominio
  private mapToProduct(data: any): Product {
    const category = new Category({
      id: data.category.id,
      name: data.category.name,
      description: data.category.description,
      parentId: data.category.parentId,
      createdAt: data.category.createdAt,
      updatedAt: data.category.updatedAt,
    })

    const supplier = new Supplier({
      id: data.supplier.id,
      name: data.supplier.name,
      contactName: data.supplier.contactName,
      email: data.supplier.email,
      phone: data.supplier.phone,
      address: data.supplier.address,
      taxId: data.supplier.taxId,
      notes: data.supplier.notes,
      isActive: data.supplier.isActive,
      createdAt: data.supplier.createdAt,
      updatedAt: data.supplier.updatedAt,
    })

    const productProps: ProductProps = {
      id: data.id,
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
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }

    return new Product(productProps)
  }
}
