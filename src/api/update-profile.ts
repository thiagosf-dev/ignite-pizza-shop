import { api } from '@/lib/axios'

interface UpdateProfileBody {
  description: string | null
  name: string
}

export async function updateProfile({ description, name }: UpdateProfileBody) {
  await api.put(`/profile`, { description, name })
}
