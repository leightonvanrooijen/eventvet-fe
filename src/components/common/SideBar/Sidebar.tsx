"use client";

import { ReactNode } from "react";

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white h-full shadow-xl outline-2 outline-black flex flex-col">
      {children}
    </div>
  );
};
