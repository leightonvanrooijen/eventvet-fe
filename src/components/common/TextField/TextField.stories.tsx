import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TextField} from "./TextField";

const meta: Meta<typeof TextField> = {
  title: 'Text Field',
  component: TextField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div><TextField label={"Label"} /></div>
    )
  },
  args: {},
};