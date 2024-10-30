import React from "react";
import SidebarItems from "./SidebarItems";

function Sidebar({ isSidebarOpen }) {
  return (
    <aside
      className={`bg-white shadow-lg z-20 w-64 h-[calc(100vh-64px)] fixed top-16 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      <SidebarItems />
    </aside>
  );
}

export default Sidebar;
