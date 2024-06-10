import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Typography } from "@material-tailwind/react";

const adminNavLinks = [
  {
    path: "/admin",
    title: "Movies",
  },
  {
    path: "/admin/rooms",
    title: "Rooms",
  },
];
const clientNavLinks = [
  {
    path: "/rooms",
    title: "Rooms",
  },
];

export const NavBar = () => {
  const location = useLocation();
  const isAdminURL = location.pathname.includes("admin");
  const links = isAdminURL ? adminNavLinks : clientNavLinks;

  return (
    <Navbar className="sticky inset-0 z-20 h-max min-h-[60px] max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div>
          {isAdminURL ? (
            <NavLink to="/admin">
              <Typography
                variant="h3"
                className="mr-4 py-1.5 text-blue-500 font-bold"
              >
                Cinema Admin
              </Typography>
            </NavLink>
          ) : (
            <NavLink to="/">
              <Typography
                variant="h3"
                className="mr-4 py-1.5 text-blue-500 font-bold"
              >
                Cinema
              </Typography>
            </NavLink>
          )}
        </div>
        <div className="flex items-center">
          {links?.map((link, i) => {
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "mr-6 text-blue-500" : "mr-6"
                }
              >
                <Typography
                  size="md"
                  className="mr-4 cursor-pointer py-1.5 font-bold"
                >
                  {link.title}
                </Typography>
              </NavLink>
            );
          })}
        </div>
      </div>
    </Navbar>
  );
};
