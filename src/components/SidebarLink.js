import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`'realtive px-8 py-2 text-md font-medium' ${
        matchRoute(link.path) ? "bg-indigo-600 text-white" : "bg-opacity-0"
      }`}
    >
      <div className="relative">
        <span
          className={`${
            matchRoute(link.path)
              ? "absolute -left-8 -top-2 h-[40px] w-[0.2rem] bg-white"
              : "opacity-0"
          }`}
        ></span>

        <div className="flex items-center gap-x-2">
          <Icon className="text-lg" />
          <span>{link.name}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
