"use client";

import { Menu } from "@headlessui/react";
import { ReactNode } from "react";
import { ListItem } from "../ListItem/LIstItem";
import { Skeleton } from "../Skeleton/Skeleton";

export const List = ({
  children,
  loading,
}: {
  children: ReactNode;
  loading?: boolean;
}) => {
  return (
    <Menu>
      <Menu.Items
        static
        className="w-full overflow-auto shadow-inner divide-y divide-gray-100 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none px-1 py-1"
      >
        {!loading && children}
        {loading && (
          <>
            <ListItem disabled text={<Skeleton />}></ListItem>
            <ListItem disabled text={<Skeleton />}></ListItem>
            <ListItem disabled text={<Skeleton />}></ListItem>
            <ListItem disabled text={<Skeleton />}></ListItem>
          </>
        )}
      </Menu.Items>
    </Menu>
  );
};
