import React from "react";
import { NavBar } from "./navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="mx-auto max-w-screen-md">{children}</div>
    </div>
  );
};
