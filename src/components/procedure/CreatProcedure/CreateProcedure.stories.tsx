import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CreateProcedure } from "./CreateProcedure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockProvider } from "../../../packages/test/MockProvider";

const meta: Meta<typeof CreateProcedure> = {
  title: "Procedure/Create Procedure",
  component: CreateProcedure,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CreateProcedure>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="h-screen">
        <MockProvider withQuery>
          <CreateProcedure />
        </MockProvider>
      </div>
    );
  },
  args: {},
};
