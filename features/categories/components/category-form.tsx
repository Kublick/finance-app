import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { insertCategorySchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const CategoryForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  {...field}
                  placeholder="ej. Comida, Viajes, Etc"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled} type="submit">
          {id ? "Grabar Cambios" : "Crear Categoría"}
        </Button>
        {!!id && (
          <Button type="button" onClick={handleDelete} variant="outline">
            <Trash className="mr-2 size-4" />
            Eliminar Categoria
          </Button>
        )}
      </form>
    </Form>
  );
};
