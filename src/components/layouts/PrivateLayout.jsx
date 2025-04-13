import React from "react";
import DesktopSideBar from "@/components/navigation/DesktopSideBar";
import MobileSideBar from "@/components/navigation/MobileSideBar";
import HeaderNavBar from "@/components/navigation/HeaderNavBar";

export default function PrivateLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <DesktopSideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header only visible on mobile */}
        <div className="md:hidden">
          <HeaderNavBar />
        </div>

        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileSideBar />
      </div>
    </div>
  );
}
