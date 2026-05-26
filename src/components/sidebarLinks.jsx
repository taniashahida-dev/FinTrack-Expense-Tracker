import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Settings
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: Wallet,
  },
  {
    title: "Budget",
    href: "/budget",
    icon: Receipt,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];