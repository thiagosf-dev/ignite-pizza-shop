import { OrderStatus } from '@/components/order-status'
import { api } from '@/lib/axios'

export interface getOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface OrderResponse {
  orderId: string
  createdAt: string
  status: OrderStatus
  customerName: string
  total: number
}

export interface GetOrdersResponse {
  orders: OrderResponse[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: getOrdersQuery) {
  const response = await api.get<GetOrdersResponse>(`/orders`, {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  })

  return response.data
}
