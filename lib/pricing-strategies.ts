// Implementación del patrón Strategy para diferentes estrategias de precios

// Interfaz para la estrategia de precios
export interface PricingStrategy {
  calculatePrice(basePrice: number, product: any): number
  getName(): string
  getDescription(): string
}

// Estrategia de precio estándar
export class StandardPricingStrategy implements PricingStrategy {
  private markup: number

  constructor(markup = 0.3) {
    // 30% de margen por defecto
    this.markup = markup
  }

  calculatePrice(basePrice: number, product: any): number {
    return basePrice * (1 + this.markup)
  }

  getName(): string {
    return "Precio Estándar"
  }

  getDescription(): string {
    return `Margen fijo del ${this.markup * 100}% sobre el costo`
  }
}

// Estrategia de precio por volumen
export class VolumePricingStrategy implements PricingStrategy {
  private tiers: { threshold: number; discount: number }[]

  constructor(tiers?: { threshold: number; discount: number }[]) {
    this.tiers = tiers || [
      { threshold: 10, discount: 0.05 }, // 5% de descuento para compras de 10+ unidades
      { threshold: 50, discount: 0.1 }, // 10% de descuento para compras de 50+ unidades
      { threshold: 100, discount: 0.15 }, // 15% de descuento para compras de 100+ unidades
    ]
  }

  calculatePrice(basePrice: number, product: any): number {
    const quantity = product.quantity || 1

    // Encontrar el descuento aplicable según la cantidad
    let applicableDiscount = 0
    for (const tier of this.tiers) {
      if (quantity >= tier.threshold) {
        applicableDiscount = tier.discount
      } else {
        break
      }
    }

    return basePrice * (1 - applicableDiscount)
  }

  getName(): string {
    return "Precio por Volumen"
  }

  getDescription(): string {
    return "Descuentos escalonados según la cantidad comprada"
  }
}

// Estrategia de precio para productos por vencer
export class ExpiryDatePricingStrategy implements PricingStrategy {
  private thresholdDays: number
  private maxDiscount: number

  constructor(thresholdDays = 90, maxDiscount = 0.5) {
    this.thresholdDays = thresholdDays
    this.maxDiscount = maxDiscount
  }

  calculatePrice(basePrice: number, product: any): number {
    if (!product.expiryDate) {
      return basePrice
    }

    const today = new Date()
    const expiryDate = new Date(product.expiryDate)
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry > this.thresholdDays) {
      return basePrice
    }

    // Calcular descuento proporcional a la cercanía de la fecha de vencimiento
    const discountRatio = 1 - daysUntilExpiry / this.thresholdDays
    const discount = Math.min(discountRatio, this.maxDiscount)

    return basePrice * (1 - discount)
  }

  getName(): string {
    return "Precio por Vencimiento"
  }

  getDescription(): string {
    return `Descuentos progresivos para productos que vencen en menos de ${this.thresholdDays} días`
  }
}

// Contexto que utiliza la estrategia de precios
export class PricingContext {
  private strategy: PricingStrategy

  constructor(strategy: PricingStrategy = new StandardPricingStrategy()) {
    this.strategy = strategy
  }

  setStrategy(strategy: PricingStrategy): void {
    this.strategy = strategy
  }

  calculatePrice(basePrice: number, product: any): number {
    return this.strategy.calculatePrice(basePrice, product)
  }

  getStrategyInfo(): { name: string; description: string } {
    return {
      name: this.strategy.getName(),
      description: this.strategy.getDescription(),
    }
  }
}
