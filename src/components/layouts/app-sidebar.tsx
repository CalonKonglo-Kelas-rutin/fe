"use client";

import * as React from "react";
import { 
  LayoutGrid, 
  Package, 
  Wallet, 
  CreditCard,
  Plus,
  Clock,
  CheckCircle2
} from "lucide-react";
import { NavMain, NavBrand } from "@/components/layouts/nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Navigation data for RWA Platform
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutGrid,
    },
    {
      title: "Register Asset",
      url: "/assets/register",
      icon: Plus,
    },
    {
      title: "Asset Status",
      url: "/assets/status",
      icon: Clock,
    },
    {
      title: "Verification",
      url: "/assets/verification",
      icon: CheckCircle2,
    },
    {
      title: "Tokenize",
      url: "/assets/tokenize",
      icon: Package,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: Wallet,
    },
    {
      title: "Repayment",
      url: "/repayment",
      icon: CreditCard,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
