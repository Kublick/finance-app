"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/user-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || categoriesQuery.isPending;

  if (categoriesQuery.isLoading)
    return (
      <div className="mx-auto -mt-0 w-full max-w-screen-2xl pb-10 lg:-mt-16">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-18 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="mx-auto -mt-0 w-full max-w-screen-2xl pb-10 lg:-mt-16">
      <Card className="border-none drop-shadow-sm">
        <CardHeader
          className={"gap-y-2 lg:flex-row lg:items-center lg:justify-between"}
        >
          <CardTitle className="line-clamp-1 text-xl">Categorias</CardTitle>
          <Button size={"sm"} onClick={newCategory.onOpen}>
            <Plus className="mr-2 size-4" /> Agregar Categoria
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={categories}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate(ids);
            }}
            disabled={isDisabled}
            filterAttribute="por nombre"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
