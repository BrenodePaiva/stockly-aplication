import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="fixed h-full w-48 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-8">
        <SidebarButton href="/">
          <LayoutGridIcon />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
