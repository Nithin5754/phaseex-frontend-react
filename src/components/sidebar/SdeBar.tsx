import { SideBarItemsType } from "@/features/types/sideBarItemsType";
import {
  Bell,
  Home,
  LayoutDashboard,
  Mail,
  MoreHorizontal,
  PlusCircleIcon,
} from "lucide-react";
import SideBarButton from "./SideBar-btb";
import { useMediaQuery } from "usehooks-ts";
import SideBarDesktop from "./SideBarDesktop";
import SideBarMobile from "./SideBarMobile";
import { OpenModal } from "../modal/box-modal-settings";
import { Link } from "react-router-dom";

const sidebarItems: SideBarItemsType = {
  links: [
    { label: "Home", href: "/homepage", icon: Home },
    { label: "DashBoard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Inbox", href: "/hello", icon: Bell },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SideBarButton icon={MoreHorizontal} className="w-full">
        More
      </SideBarButton>
      <OpenModal title={"create galaxy"} icon={PlusCircleIcon} />
      {/* <Link to={'/space/create'}>
     <SideBarButton icon={PlusCircleIcon} className="w-full bg-slate-700 text-primary">
              create new galaxy
           </SideBarButton>
     </Link> */}

      <Link to={"/space"}>
        <SideBarButton icon={LayoutDashboard} className="w-full">
          view more galaxy
        </SideBarButton>
      </Link>
    </div>
  ),
};

const SideBar = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SideBarDesktop sidebarItems={sidebarItems}  />;
  }

  return <SideBarMobile sidebarItems={sidebarItems} />;
};
export default SideBar;
