"use client";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleSheetContent from "./upsert-sheet-content";
import { Product } from "@/app/generated/prisma";
import { ComboboxOption } from "@/app/_components/ui/Combobox";
import { useState } from "react";

interface CreateSaleProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSaleButton = (props: CreateSaleProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Nova Venda</Button>
      </SheetTrigger>
      <UpsertSaleSheetContent
        onSubmitSuccess={() => setSheetIsOpen(false)}
        {...props}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
