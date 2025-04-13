import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tabs } from "@/config/Tabs";
import { motion } from "framer-motion";
import AddData from "@/components/ui/AddData";

export default function MobileSideBar() {
  const router = useRouter();

  const leftTabs = Tabs.slice(0, Math.ceil(Tabs.length / 2));
  const rightTabs = Tabs.slice(Math.ceil(Tabs.length / 2));

  return (
    <nav className="mx-2 mb-4 flex justify-around items-end bg-white py-3 px-4 rounded-2xl">
      {leftTabs.map((tab) => {
        const isActive = router.pathname === tab.href;
        const Icon = tab.icon;

        return (
          <motion.div
            key={tab.href}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center"
          >
            <Link href={tab.href} className="w-full flex justify-center">
              <div className="flex flex-col items-center text-xs gap-0.5 transition-all">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "text-[#2D61F0]" : "text-gray-500"}`} />
                <span className={`${isActive ? "text-[#2D61F0]" : "text-gray-500"} text-[10px]`}>{tab.label}</span>
              </div>
            </Link>
          </motion.div>
        );
      })}

      <div className="relative z-40">
        <AddData minimized mobile onClick={(type) => console.log("add", type)} />
      </div>

      {rightTabs.map((tab) => {
        const isActive = router.pathname === tab.href;
        const Icon = tab.icon;

        return (
          <motion.div
            key={tab.href}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center"
          >
            <Link href={tab.href} className="w-full flex justify-center">
              <div className="flex flex-col items-center text-xs gap-0.5 transition-all">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "text-[#2D61F0]" : "text-gray-500"}`} />
                <span className={`${isActive ? "text-[#2D61F0]" : "text-gray-500"} text-[10px]`}>{tab.label}</span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
