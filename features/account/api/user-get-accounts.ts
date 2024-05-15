import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const respose = await client.api.accounts.$get();
      if (!respose.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
