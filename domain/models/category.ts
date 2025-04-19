export interface CategoryProps {
  id: string
  name: string
  description?: string
  parentId?: string
  createdAt: Date
  updatedAt: Date
}

export class Category {
  private props: CategoryProps

  constructor(props: CategoryProps) {
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
  get description(): string | undefined {
    return this.props.description
  }
  get parentId(): string | undefined {
    return this.props.parentId
  }
  get createdAt(): Date {
    return this.props.createdAt
  }
  get updatedAt(): Date {
    return this.props.updatedAt
  }

  // Métodos
  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Category name is required")
    }
    this.props.name = name
    this.props.updatedAt = new Date()
  }

  updateDescription(description?: string): void {
    this.props.description = description
    this.props.updatedAt = new Date()
  }

  // Validaciones
  private validateProps(props: CategoryProps): void {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Category name is required")
    }
  }

  // Factory Method
  static create(props: Omit<CategoryProps, "id" | "createdAt" | "updatedAt">): Category {
    const now = new Date()
    return new Category({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    })
  }
}
