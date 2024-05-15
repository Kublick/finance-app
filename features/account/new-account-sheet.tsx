import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "./hooks/useNewAccount";
import { AccountForm } from "./components/accounts-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccounts } from "./api/use-create-accounts";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccounts();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
