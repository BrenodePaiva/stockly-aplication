"use server";

import { Suspense } from "react";

import ProductContent, {
  ProductContentSkeleton,
} from "./_components/product-content";

const ProductsPage = async () => {
  return (
    <Suspense fallback={<ProductContentSkeleton />}>
      <ProductContent />
    </Suspense>
  );
};

export default ProductsPage;
