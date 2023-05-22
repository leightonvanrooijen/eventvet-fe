import { PreformProcedureHeading } from "./PreformProcedure.Heading";
import { render, waitFor } from "@testing-library/react";
import { MockProvider } from "../../../packages/test/MockProvider";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { PROCEDURE_URL } from "../../../socket";
import { procedureFake } from "../../../api/procedure.fake";
import { userEvent } from "@storybook/testing-library";

const setUp = (
  procedure = procedureFake({ name: "one", status: "pending" }),
  onNextStatusClick = jest.fn()
) => {
  return render(
    <MockProvider withQuery withTheme>
      <PreformProcedureHeading
        procedure={procedure}
        onNextStatusClick={onNextStatusClick}
      />
    </MockProvider>
  );
};

describe("PreformProcedureHeading", () => {
  it("should display the name of the procedure", () => {
    const { getByText } = setUp();

    expect(getByText("one")).toBeInTheDocument();
  });
  it("should display the status of the procedure", () => {
    const { getByText } = setUp();

    expect(getByText("Pending")).toBeInTheDocument();
  });
  it("should display the next action for the procedure", () => {
    const { getByRole } = setUp();

    expect(getByRole("button", { name: "Begin" })).toBeInTheDocument();
  });
  it("calls onNextStatusClick when the next status button is clicked", async () => {
    const onNextStatusClick = jest.fn();
    const procedure = procedureFake();
    const { getByRole } = setUp(procedure, onNextStatusClick);

    const button = getByRole("button", { name: "Begin" });

    await waitFor(() => {
      userEvent.click(button);
    });

    expect(onNextStatusClick).toHaveBeenCalledWith({
      id: procedure.id,
      status: procedure.status,
      version: procedure.version,
    });
  });
});
