import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetRandomQuote = (category: string = "") => {
  return useQuery(["randomQuote"], async () => {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_X_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  });
};
