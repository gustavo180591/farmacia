import { type NextRequest, NextResponse } from "next/server"
import { ProductRepositoryImpl } from "@/infrastructure/repositories/product-repository-impl"
import { CreateProductUseCase } from "@/application/use-cases/product/create-product-use-case"

// Simulación de servicios para obtener categoría y proveedor
const getCategoryById = async (id: string) => {
  // En una implementación real, esto usaría un repositorio de categorías
  return { id, name: "Medicamentos" /* otros campos */ }
}

const getSupplierById = async (id: string) => {
  // En una implementación real, esto usaría un repositorio de proveedores
  return { id, name: "Proveedor Farmacéutico", isActive: true /* otros campos */ }
}

// Controlador para la API de productos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación básica
    if (!body.name || !body.sku || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Inicializar repositorio y caso de uso
    const productRepository = new ProductRepositoryImpl()
    const createProductUseCase = new CreateProductUseCase(productRepository, getCategoryById, getSupplierById)

    // Ejecutar caso de uso
    const result = await createProductUseCase.execute(body)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const productRepository = new ProductRepositoryImpl()

    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const supplierId = searchParams.get("supplierId")
    const lowStock = searchParams.get("lowStock")

    let products

    // Aplicar filtros según los parámetros
    if (categoryId) {
      products = await productRepository.findByCategory(categoryId)
    } else if (supplierId) {
      products = await productRepository.findBySupplier(supplierId)
    } else if (lowStock === "true") {
      products = await productRepository.findLowStock()
    } else {
      products = await productRepository.findAll()
    }

    // Transformar a DTO para la respuesta
    const productsDTO = products.map((product) => ({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      supplier: {
        id: product.supplier.id,
        name: product.supplier.name,
      },
      requiresPrescription: product.requiresPrescription,
      isLowStock: product.isLowStock(),
    }))

    return NextResponse.json(productsDTO)
  } catch (error) {
    console.error("Error fetching products:", error)

    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
