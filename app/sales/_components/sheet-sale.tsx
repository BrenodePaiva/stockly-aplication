"use client";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleSheetContent from "./upsert-sheet-content";
import { ComboboxOption } from "@/app/_components/ui/Combobox";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { ProductDto } from "@/app/_data-access/product/get-products";

interface CreateSaleProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const SheetSale = (props: CreateSaleProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon /> Nova Venda
        </Button>
      </SheetTrigger>
      <UpsertSaleSheetContent
        isOpen={sheetIsOpen}
        onSubmitSuccess={() => setSheetIsOpen(false)}
        {...props}
      />
    </Sheet>
  );
};

export default SheetSale;
