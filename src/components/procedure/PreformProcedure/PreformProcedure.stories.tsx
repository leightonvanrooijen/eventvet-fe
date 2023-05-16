import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockProvider } from "../../../packages/test/MockProvider";
import { PreformProcedure } from "./PreformProcedure";

const meta: Meta<typeof PreformProcedure> = {
  title: "Procedure/Preform Procedure",
  component: PreformProcedure,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PreformProcedure>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="h-screen">
        <MockProvider withQuery>
          <PreformProcedure id={"7c11f335-d1f4-46bf-9cd5-096bc87b4b3b"} />
        </MockProvider>
      </div>
    );
  },
  args: {},
};
