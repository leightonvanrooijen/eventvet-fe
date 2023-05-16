"use client";
import { Menu } from "@headlessui/react";
import { ReactNode } from "react";

export const ListItem = ({
  text,
  secondaryText,
  onClick,
  disabled,
}: {
  text: ReactNode;
  secondaryText?: ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Menu.Item as="li" className="block">
      {({ active }) => (
        <button
          onClick={onClick}
          type={"button"}
          disabled={disabled}
          className="w-full flex flex-col hover:bg-gray-200 disabled:hover:bg-white font-medium rounded-md p-2 pl-3 text-sm"
        >
          {typeof text === "string" ? <p className="">{text}</p> : text}
          {secondaryText && <p className="text-xs">{secondaryText}</p>}
        </button>
      )}
    </Menu.Item>
  );
};
