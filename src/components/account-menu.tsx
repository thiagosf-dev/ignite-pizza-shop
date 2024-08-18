import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, Edit, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    })

  const { isPending: isSignOut, mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
    onSuccess: () => navigate('/sign-in', { replace: true }),
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex select-none items-center gap-2"
            variant="outline"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-70" align="end">
          <DropdownMenuLabel className="flex items-center justify-center gap-2">
            {isLoadingProfile ? (
              <>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-4" />
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <span>{profile?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {profile?.email}
                  </span>
                </div>

                <Button className="p-2" variant="ghost">
                  <Edit className="h-4 w-4 text-green-900" />
                </Button>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
              <Building className="h4 mr-2 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            className="cursor-pointer text-rose-500 dark:text-rose-400"
            asChild
            disabled={isSignOut}
          >
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="h4 mr-2 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
