import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useOpenTransaction } from "../../../features/transactions/hooks/use-open-transaction";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      onOpenAccount(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center hover:underline",
        !category && "text-red-500",
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category}
      {!category && "Sin Categoria"}
    </div>
  );
};
