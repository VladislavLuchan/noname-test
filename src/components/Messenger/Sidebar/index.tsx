import React from "react";
import SidebarNav from "./SidebarNav";
import SidebarSearch from "./SidebarSearch";
import './Sidebar.scss';
import SidebarChats from "./SidebarChats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarNav />
      <SidebarSearch/>
      <SidebarChats />
    </div>
  );
};

export default Sidebar;