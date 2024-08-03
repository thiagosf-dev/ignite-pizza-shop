import { Building, ChevronDown, Edit, LogOut } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex select-none items-center gap-2"
          variant="outline"
        >
          Pizza Shop
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-70" align="end">
        <DropdownMenuLabel className="flex items-center justify-center gap-2">
          <div className="flex flex-col">
            <span>Thiago Soares Figueiredo</span>
            <span className="text-xs font-normal text-muted-foreground">
              thiago@email.com.br
            </span>
          </div>

          <Button className="p-2" variant="ghost">
            <Edit className="h-4 w-4 text-green-900" />
          </Button>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Building className="h4 mr-2 w-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer text-rose-500 dark:text-rose-400">
          <LogOut className="h4 mr-2 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
