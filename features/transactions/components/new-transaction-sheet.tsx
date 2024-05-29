import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/use-new-transaction";

import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransactions } from "../api/use-create-transaction";
import { useGetCategories } from "@/features/categories/api/user-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/account/api/user-get-accounts";
import { useCreateAccounts } from "@/features/account/api/use-create-accounts";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransactions();

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const acoountQuery = useGetAccounts();
  const acoountMutation = useCreateAccounts();

  const onCreateAccount = (name: string) => {
    acoountMutation.mutate({ name });
  };

  const accountOptions = (acoountQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    acoountMutation.isPending;

  const isLoading = categoryQuery.isLoading || acoountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nuevo Movimiento</SheetTitle>
          <SheetDescription>Agrega una nueva transaccion.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="text-slate-foreground size-4 animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
