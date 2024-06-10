import React from "react";
import { Spinner } from "@material-tailwind/react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="blue" />
    </div>
  );
};
