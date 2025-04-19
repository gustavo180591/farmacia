import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSalesCard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Juan Díaz</p>
          <p className="text-sm text-muted-foreground">Medicamentos para hipertensión</p>
        </div>
        <div className="ml-auto font-medium">+$245.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">María Rodríguez</p>
          <p className="text-sm text-muted-foreground">Productos dermatológicos</p>
        </div>
        <div className="ml-auto font-medium">+$189.50</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carlos López</p>
          <p className="text-sm text-muted-foreground">Antibióticos con receta</p>
        </div>
        <div className="ml-auto font-medium">+$320.75</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana García</p>
          <p className="text-sm text-muted-foreground">Suplementos vitamínicos</p>
        </div>
        <div className="ml-auto font-medium">+$92.25</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>PM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pedro Martínez</p>
          <p className="text-sm text-muted-foreground">Productos para diabetes</p>
        </div>
        <div className="ml-auto font-medium">+$276.00</div>
      </div>
    </div>
  )
}
