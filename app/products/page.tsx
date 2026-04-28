"use server";
import { Suspense } from "react"
import { Header, HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import CreateProductButton from "./_components/create-product-button";
import ProductContent, { ProductContentSkeleton } from "./_components/product-content";

const ProductsPage = async () => {
  return (
     <div className="m-8 ml-56 w-full space-y-8 rounded-lg bg-white p-8">
          <Header>
            <HeaderLeft>
              <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
              <HeaderTitle>Produto</HeaderTitle>
            </HeaderLeft>
            <HeaderRight>
              <CreateProductButton />
            </HeaderRight>
          </Header>
    
      <Suspense fallback={<ProductContentSkeleton />}>
          <ProductContent/>
      </Suspense>
    </div>
  );
};

export default ProductsPage;
