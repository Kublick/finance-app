"use client";

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/account/api/user-get-accounts";
import { useNewAccount } from "@/features/account/hooks/useNewAccount";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <div>
      <Button onClick={onOpen}>Add an Account</Button>
    </div>
  );
}
