"use client";

import { EditAccount } from "@/features/account/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/account/components/new-account-sheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccount />
    </>
  );
};

export default SheetProvider;
