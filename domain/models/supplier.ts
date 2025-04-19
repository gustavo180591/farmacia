export interface SupplierProps {
  id: string
  name: string
  contactName?: string
  email?: string
  phone?: string
  address?: string
  taxId?: string
  notes?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export class Supplier {
  private props: SupplierProps

  constructor(props: SupplierProps) {
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
  get contactName(): string | undefined {
    return this.props.contactName
  }
  get email(): string | undefined {
    return this.props.email
  }
  get phone(): string | undefined {
    return this.props.phone
  }
  get address(): string | undefined {
    return this.props.address
  }
  get taxId(): string | undefined {
    return this.props.taxId
  }
  get notes(): string | undefined {
    return this.props.notes
  }
  get isActive(): boolean {
    return this.props.isActive
  }
  get createdAt(): Date {
    return this.props.createdAt
  }
  get updatedAt(): Date {
    return this.props.updatedAt
  }

  // Métodos
  activate(): void {
    this.props.isActive = true
    this.props.updatedAt = new Date()
  }

  deactivate(): void {
    this.props.isActive = false
    this.props.updatedAt = new Date()
  }

  updateContactInfo(params: {
    contactName?: string
    email?: string
    phone?: string
    address?: string
  }): void {
    if (params.contactName !== undefined) this.props.contactName = params.contactName
    if (params.email !== undefined) {
      if (params.email && !this.isValidEmail(params.email)) {
        throw new Error("Invalid email format")
      }
      this.props.email = params.email
    }
    if (params.phone !== undefined) this.props.phone = params.phone
    if (params.address !== undefined) this.props.address = params.address

    this.props.updatedAt = new Date()
  }

  // Validaciones
  private validateProps(props: SupplierProps): void {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Supplier name is required")
    }

    if (props.email && !this.isValidEmail(props.email)) {
      throw new Error("Invalid email format")
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Factory Method
  static create(props: Omit<SupplierProps, "id" | "createdAt" | "updatedAt">): Supplier {
    const now = new Date()
    return new Supplier({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    })
  }
}
