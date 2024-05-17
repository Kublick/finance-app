import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    // TODO check if params are required in the key
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const respose = await client.api.transactions.$get({
        query: { from, to, accountId },
      });

      if (!respose.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
