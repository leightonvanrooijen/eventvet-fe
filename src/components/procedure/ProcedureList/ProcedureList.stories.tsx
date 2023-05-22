import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ProcedureList } from "./ProcedureList";
import { MockProvider } from "../../../packages/test/MockProvider";

const meta: Meta<typeof ProcedureList> = {
  title: "Procedure/Procedure List",
  component: ProcedureList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProcedureList>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="h-80 w-60 flex flex-col">
        <MockProvider withQuery>
          <ProcedureList setId={() => {}} />
        </MockProvider>
      </div>
    );
  },
  args: {},
};
