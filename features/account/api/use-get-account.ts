import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const respose = await client.api.accounts[":id"].$get({
        param: { id },
      });

      if (!respose.ok) {
        throw new Error("Failed to fetch account");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
