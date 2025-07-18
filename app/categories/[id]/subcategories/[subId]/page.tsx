import TopNavigation from "@/components/TopNavigation";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import SubcategoryProductList from "./SubcategoryProductList";

export default function SubcategoryPage() {
  return (
    <div>
      <TopNavigation />
      <SubcategoryProductList />
      <MobileTabNavigation />
    </div>
  );
}
