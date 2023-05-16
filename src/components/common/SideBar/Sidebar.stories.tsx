import {Meta, StoryObj} from "@storybook/react";
import {Menu} from "@headlessui/react";
import React from "react";
import {ListItem} from "../ListItem/LIstItem";
import {Sidebar} from "./Sidebar";
import {List} from "../List/List";

const meta: Meta<typeof Sidebar> = {
  title: 'Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="h-screen">
        <Sidebar>
          <div className="pt-3 pb-1 pl-2.5"><p className="font-bold text-xl">Event Vet</p></div>
          <List><ListItem text={"Procedure"} /><ListItem text={"Invoice"} /></List>
        </Sidebar>
      </div>
    )
  },
  args: {},
};