import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { AccountForm } from "./transaction-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-transaction";

import { Loader2Icon } from "lucide-react";

import { useDeleteAccount } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useBulkDeleteTransactions } from "../api/use-bulk-delete-transaction";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const EditAccount = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account",
  );
  const accountQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useBulkDeleteTransactions();

  const defaultValues = accountQuery.data;

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = accountQuery.isLoading;

  // const onSubmit = (values: FormValues) => {
  //   editMutation.mutate(values, {
  //     onSuccess: () => {
  //       onClose();
  //     },
  //   });
  // };

  // const onDelete = async () => {
  //   deleteMutation.mutate(undefined, {
  //     onSuccess: () => {
  //       onClose();
  //     },
  //   });
  //   await confirm();
  // };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Update an existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <p>Pending form</p>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
