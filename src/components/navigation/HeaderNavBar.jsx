import React from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { Home } from "lucide-react";

export default function HeaderNavBar() {
  return (
    <header className="w-full px-2 py-1 bg-white shadow-sm flex items-center justify-between">
      <Logo />
    </header>
  );
}
