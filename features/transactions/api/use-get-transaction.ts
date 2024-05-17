import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const respose = await client.api.transactions[":id"].$get({
        param: { id },
      });
      console.log("response", respose);

      if (!respose.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
