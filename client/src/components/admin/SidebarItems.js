import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "../admin/icons";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

const SidebarItems = () => {
  const links = [
    {
      key: 1,
      name: "Dashboard",
      href: "/admin-dashboard",
      icon: "HomeIcon",
    },
    {
      key: 2,
      name: "User Management",
      href: "/manage-user",
      icon: "PeopleIcon",
    },
    {
      key: 3,
      name: "Manage Applications",
      href: "/manage-applications",
      icon: "CardsIcon",
    },
    {
      key: 4,
      name: "Manage Bus Routes",
      href: "/manage-bus-routes",
      icon: "PagesIcon",
    },
    {
      key: 5,
      name: "Manage Transactions",
      href: "/manage-transactions",
      icon: "MoneyIcon",
    },
    {
      key: 6,
      name: "Manage Contents",
      href: "/manage-contents",
      icon: "ModalsIcon",
    },
  ];

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      {/* Sidebar links */}
      <ul className="mt-6">
        {links.map((link) => (
          <li className="relative px-6 py-3" key={link.key}>
            <Link
              to={link.href}
              className="inline-flex items-center w-full text-xs font-semibold font-poppins transition-colors duration-200 text-gray-500 hover:text-primary rounded-lg p-3 hover:bg-[#f0f5ff]"
            >
              <Icon
                className="w-5 h-5"
                aria-hidden="true"
                icon={link.icon}
                style={{ width: "20px", height: "20px" }}
              />
              <span className="ml-4">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarItems;
