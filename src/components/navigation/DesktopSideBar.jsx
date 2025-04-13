import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tabs } from "@/config/Tabs";
import Logo from "@/components/ui/Logo";
import { LogOut, ChevronsLeft, ChevronsRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { motion } from "framer-motion";

export default function DesktopSideBar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ width: collapsed ? 80 : 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen bg-white shadow-sm p-4 flex flex-col justify-between overflow-visible z-50"
    >
      <div className="space-y-4 relative z-50 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex items-center justify-center mb-4"
        >
          <Link href="/">
            <Logo minimized={collapsed} size={collapsed ? 36 : 40} />
          </Link>
        </motion.div>

        {Tabs.map((tab) => {
          const isActive = router.pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Tooltip key={tab.href} message={tab.label} disabled={!collapsed}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative z-50 overflow-visible">
                <Link
                  href={tab.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    isActive ? "bg-gray-100 text-[#2D61F0]" : "text-gray-700 hover:bg-gray-100"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && tab.label}
                </Link>
              </motion.div>
            </Tooltip>
          );
        })}
      </div>

      <div className="space-y-2 relative z-50 overflow-visible">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="whitePrimary"
            icon={collapsed ? ChevronsRight : ChevronsLeft}
            className={`w-full ${collapsed ? "justify-center" : "justify-start"} shadow-none`}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {!collapsed && "Recolher"}
          </Button>
        </motion.div>

        <Tooltip message="Sair" disabled={!collapsed}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative z-50 overflow-visible">
            <Button
              variant="whiteDanger"
              icon={LogOut}
              className={`w-full ${collapsed ? "justify-center" : "justify-start"} shadow-none`}
              onClick={() => {
                console.log("logout");
              }}
            >
              {!collapsed && "Sair"}
            </Button>
          </motion.div>
        </Tooltip>
      </div>
    </motion.div>
  );
}