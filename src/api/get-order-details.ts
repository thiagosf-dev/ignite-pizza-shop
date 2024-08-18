import { api } from '@/lib/axios'

export interface CustomerOrderDetails {
  name: string
  email: string
  phone: string | null
}

export interface ProductOrderDetails {
  name: string
}
export interface ItemOrderDetails {
  id: string
  priceInCents: number
  quantity: number
  product: ProductOrderDetails
}

export interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: CustomerOrderDetails
  orderItems: ItemOrderDetails[]
}

export interface GetOrderDetailsParams {
  orderId: string
}

export async function getOrdersDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
