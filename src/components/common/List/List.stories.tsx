import {Meta, StoryObj} from "@storybook/react";
import {Menu} from "@headlessui/react";
import {List} from "./List";
import React from "react";
import {ListItem} from "../ListItem/LIstItem";

const meta: Meta<typeof List> = {
  title: 'List',
  component: List,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Primary: Story = {
  render: (args) => {
    return (
      <List>
        <ListItem text={"List item"} />
      </List>
    )
  },
  args: {},
};