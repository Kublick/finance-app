import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const respose = await client.api.categories[":id"].$get({
        param: { id },
      });

      if (!respose.ok) {
        throw new Error("Failed to fetch category");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
