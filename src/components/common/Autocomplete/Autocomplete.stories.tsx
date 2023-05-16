import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Autocomplete } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "AutoComplete",
  component: Autocomplete,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Primary: Story = {
  render: (args) => (
    <div className="w-80">
      <Autocomplete {...args} />
    </div>
  ),
  args: {
    options: [
      { value: "1", text: "Option 1" },
      { value: "2", text: "Option 2" },
      { value: "3", text: "Option 3" },
      { value: "4", text: "Option 4" },
    ],
  },
};
