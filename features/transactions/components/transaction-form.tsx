import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/select";
import { useCreateAccounts } from "@/features/account/api/use-create-accounts";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountFromMiliUnits } from "@/lib/utils";
import { convertAmountToMiliUnits } from "../../../lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount);
    const amountToMiliUnits = convertAmountToMiliUnits(amount);

    onSubmit({
      ...values,
      amount: amountToMiliUnits,
    });
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
          name="date"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    disabled={disabled}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select an Account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    value={field.value}
                    disabled={disabled}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select a Category"
                    options={categoryOptions}
                    onCreate={onCreateCategory}
                    value={field.value}
                    disabled={disabled}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Payee</FormLabel>
                <FormControl>
                  <Input {...field} disabled={disabled} placeholder="Payee" />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <AmountInput
                    {...field}
                    placeholder="0.00"
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Optional Notes"
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <Button className="w-full" disabled={disabled} type="submit">
          {id ? "Save Changes" : "Create Account"}
        </Button>
        {!!id && (
          <Button type="button" onClick={handleDelete} variant="outline">
            <Trash className="mr-2 size-4" />
            Delete Account
          </Button>
        )}
      </form>

      {/* <FormControl>
        <label htmlFor="name">Name</label>
        <Input
          {...register("name")}
          id="name"
          disabled={disabled}
          placeholder="Name"
        />
      </FormControl>
      <Button type="submit" disabled={disabled}>
        Save
      </Button>
      {onDelete && (
        <Button
          type="button"
          variant="danger"
          disabled={disabled}
          onClick={onDelete}
        >
          <Trash />
        </Button>
      )} */}
    </Form>
  );
};
