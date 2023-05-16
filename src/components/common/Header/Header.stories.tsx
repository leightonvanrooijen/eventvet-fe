import {Meta, StoryObj} from "@storybook/react";
import {Menu} from "@headlessui/react";
import React from "react";
import {Header} from "./Header";

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="h-screen">
        <Header>

        </Header>
      </div>
    )
  },
  args: {},
};