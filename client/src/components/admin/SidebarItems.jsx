import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { TbMapRoute } from "react-icons/tb";
import { IoLayersOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

const SidebarItems = () => {
  const links = [
    {
      key: 1,
      name: "Dashboard",
      href: "/admin-dashboard",
      icon: AiOutlineHome,
    },
    {
      key: 2,
      name: "User Management",
      href: "/manage-user",
      icon: HiOutlineUserGroup,
    },
    {
      key: 3,
      name: "Manage Applications",
      href: "/manage-applications",
      icon: IoLayersOutline,
    },
    {
      key: 4,
      name: "Manage Bus Schedule",
      href: "/manage-bus-schedule",
      icon: TbMapRoute,
    },
    {
      key: 5,
      name: "Manage Transactions",
      href: "/manage-transactions",
      icon: RiMoneyDollarBoxLine,
    },
    {
      key: 6,
      name: "Manage Contents",
      href: "/manage-contents",
      icon: MdContentCopy,
    },
    {
      key: 7,
      name: "Manage Reviews",
      href: "/manage-reviews",
      icon: FaRegStar,
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
              {/* Use the icon directly */}
              <link.icon
                className="w-5 h-5"
                aria-hidden="true"
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
