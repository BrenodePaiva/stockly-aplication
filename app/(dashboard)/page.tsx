import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCardSkeleton } from "./_components/summary-card";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-in-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import Last14DaysRevenueCard from "./_components/Last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";
import MostSoldProductsCard from "./_components/most-sold-products-card";

const Home = async () => {
  return (
    <div className="m-8 w-full space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalSalesCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalInStockCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense
          fallback={
            <Skeleton className="rounded-xl bg-white p-6">
              <div className="space-y-2">
                <div className="h-5 w-20 bg-gray-200" />
                <div className="h-5 w-32 bg-gray-200" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>

        <Suspense
          fallback={
            <Skeleton className="rounded-xl bg-white p-6">
              <div className="flex items-center space-y-2">
                <div className="h-5 w-48 bg-gray-200" />
              </div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className="flex items-center justify-between pt-5"
                  key={index}
                >
                  <div className="space-y-2">
                    <div className="h-5 w-24 bg-gray-200" />
                    <div className="h-5 w-20 bg-gray-200" />
                    <div className="h-5 w-24 bg-gray-200" />
                  </div>
                  <div>
                    <div className="h-5 w-20 bg-gray-200" />
                  </div>
                </div>
              ))}
            </Skeleton>
          }
        >
          <MostSoldProductsCard />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
