import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    /**
     * executa quando na resposta do término da chamada a uma requisição
     */
    // onSuccess(_, { description, name }) {
    //   const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
    //     'managed-restaurant',
    //   ])

    //   if (cached) {
    //     queryClient.setQueryData<GetManagedRestaurantResponse>(
    //       ['managed-restaurant'],
    //       {
    //         ...cached,
    //         description,
    //         name,
    //       },
    //     )
    //   }
    // },
    /**
     * executa assim que uma requisição é disparada, não espera o retorno
     */
    onMutate({ description, name }) {
      const { cached } = updateManagedRestaurantCache({ description, name })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      description: managedRestaurant?.description ?? '',
      name: managedRestaurant?.name ?? '',
    },
  })

  function updateManagedRestaurantCache({
    description,
    name,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          description,
          name,
        },
      )
    }

    return { cached }
  }

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({ description: data.description, name: data.name })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Falha ao atualizar o perfil, tente novamente mais tarde!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize a informações do seu estabelecimento visíveis ao seu cliente.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              disabled={isSubmitting}
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Nome
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              disabled={isSubmitting}
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
