import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

export const useCreateEntry = () => {
  return useMutation(
    async ({ content, year, month, day }: { content: string, year: string, month: string, day: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/journal/new/${year}/${month}/${day}`, {
        content: content,
      }, {
        withCredentials: true,
      })
      return response.data
    },
  )
}