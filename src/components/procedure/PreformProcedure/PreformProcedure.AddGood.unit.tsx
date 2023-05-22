import { PreformProcedureAddGood } from "./PreformProcedure.AddGood";
import { render, waitFor } from "@testing-library/react";
import { userEvent } from "@storybook/testing-library";
import { MockProvider } from "../../../packages/test/MockProvider";

describe("PreformProcedureAddGood", () => {
  it("calls the onSubmit function when the form is submitted", async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <MockProvider withTheme>
        <PreformProcedureAddGood onSubmit={onSubmit} register={jest.fn()} />
      </MockProvider>
    );

    await waitFor(() => {
      userEvent.click(getByText("Add"));
    });

    expect(onSubmit).toHaveBeenCalled();
  });
});
