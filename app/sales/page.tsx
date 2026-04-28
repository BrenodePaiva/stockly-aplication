import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import CreateSaleButton, { CreateSaleButtonSkeleton } from "./_components/create-sale-button";
import { Suspense } from "react";
import SaleContent, { SaleContentSkeleton } from "./_components/sale-content";

const Sales = async () => {
  
  return (
    
    <div className="m-8 ml-56 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <Suspense fallback={<CreateSaleButtonSkeleton/>}>
            <CreateSaleButton/>
          </Suspense>
        </HeaderRight>
      </Header>

      <Suspense fallback={<SaleContentSkeleton/>}>
        <SaleContent/>
      </Suspense>
    </div>
  );
};

export default Sales;
