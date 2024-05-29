import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts.$post, 200>;

type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$post({ json });
      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Cuenta creada");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error("Ocurrio un error al crear la cuenta");
    },
  });
  return mutation;
};
