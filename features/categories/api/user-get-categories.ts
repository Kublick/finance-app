import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const respose = await client.api.categories.$get();
      if (!respose.ok) {
        throw new Error("Failed to fetch categories");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
