import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'

export const useUpsertEntry = () => {
  return useMutation(
    async ({ content, year, month, day }: { content: string, year: string, month: string, day: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/journal/upsert/${year}/${month}/${day}`, {
        content: content,
      }, {
        withCredentials: true,
      })
      return response.data
    },
  )
}

export const useGetEntry = (year: string, month: string, day: string) => {
  return useQuery(
    ['entry', `${year}-${month}-${day}`],
    async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/journal/${year}/${month}/${day}`, {
        withCredentials: true,
      })
      return response.data
    },
    {
      retry: (_failureCount, error: any) => {
        if (error?.response?.status === 404) {
          return false
        }
        return true
      },
      cacheTime: 0,
    }
  )
}

export const useAnalyseEntry = () => {
  return useMutation(
    async ({ year, month, day }: { year: string, month: string, day: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/journal/analyse/${year}/${month}/${day}`, {}, {
        withCredentials: true,
      })
      return response.data
    }
  )
}