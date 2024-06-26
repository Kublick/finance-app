"use client";

import { useGetAccounts } from "@/features/account/api/user-get-accounts";
import qs from "query-string";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "./ui/select";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

const AccountFilter = () => {
  const router = useRouter();
  const pathName = usePathname();

  const param = useSearchParams();
  const accountId = param.get("accountId") || "all";
  const from = param.get("from") || "";
  const to = param.get("to") || "";

  const { isLoading: isLoadingSummary } = useGetSummary();

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="h-9 w-full rounded-md border-none bg-white/20 px-3 font-normal text-white outline-none transition hover:bg-white/40 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto">
        <SelectValue placeholder="Selecciona una cuenta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas las Cuentas</SelectItem>
        {accounts?.map((account) => {
          return (
            <SelectItem key={account.id} value={account.id}>
              {account.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default AccountFilter;
