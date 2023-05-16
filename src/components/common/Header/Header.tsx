import React, {ReactNode} from "react";
import {Button} from "../Button/Button";

export const Header = ({ children }: { children?: ReactNode}) => {
  return (
    <div className="h-16 w-full bg-white shadow-xl flex items-center pl-4 pr-4">
      <div className="pb-1"><p className="font-bold text-xl">Event Vet</p></div>
      <div className="ml-auto">
        <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 hover:underline mr-8">Procedure</button>
        <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 hover:underline mr-8">Invoice</button>
      </div>
    </div>
  )
}