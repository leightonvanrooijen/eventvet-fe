import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Button} from "./Button";


const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button"
  },
};
