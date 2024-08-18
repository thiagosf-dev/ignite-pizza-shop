import { api } from '@/lib/axios'

export interface GetDayliRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDayliRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDayliRevenueInPeriod({
  from,
  to,
}: GetDayliRevenueInPeriodQuery) {
  const response = await api.get<GetDayliRevenueInPeriodResponse>(
    `/metrics/daily-receipt-in-period`,
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
