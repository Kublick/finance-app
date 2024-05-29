import { useGetAccounts } from "../api/user-get-accounts";
import { useCreateAccounts } from "../api/use-create-accounts";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Select } from "@/components/select";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>,
] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccounts();

  const onCreateAccount = (name: string) => accountMutation.mutate({ name });

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const selectValue = useRef<string>();

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    console.log("selectValue.current", selectValue.current);
    promise?.resolve(selectValue.current);

    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader className="pt-6">
          <Select
            placeholder="Selecciona una cuenta"
            options={accountOptions}
            onChange={(value) => {
              selectValue.current = value;
            }}
            disabled={accountQuery.isLoading || accountMutation.isPending}
            onCreate={onCreateAccount}
          />

          <DialogTitle>Selecciona una cuenta</DialogTitle>
          <DialogDescription>
            Selecciona una cuenta para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="destructive">
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
