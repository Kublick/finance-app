"use client";

import { EditAccount } from "@/features/account/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/account/components/new-account-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-account-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccount />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
    </>
  );
};

export default SheetProvider;
