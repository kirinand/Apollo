import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const useGetSentiments = (start: string, end: string) => {
  return useQuery(
    ['sentiments', start, end],
    async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sentiment/aggregate/type`, {
        params: {
          start,
          end
        },
        withCredentials: true,
      })
      return response.data
    }
  )
}

export const useGetDailyScores = (start: string, end: string) => {
  return useQuery(
    ['dailyScores', start, end],
    async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sentiment/aggregate/score`, {
        params: {
          start,
          end
        },
        withCredentials: true,
      })
      return response.data
    }
  )
}