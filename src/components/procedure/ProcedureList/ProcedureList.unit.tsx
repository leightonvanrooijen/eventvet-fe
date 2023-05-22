import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProcedureList } from "./ProcedureList";
import { render, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { PROCEDURE_URL } from "../../../socket";
import userEvent from "@testing-library/user-event";
import { procedureFake } from "../../../api/procedure.fake";
import { MockProvider } from "../../../packages/test/MockProvider";

const server = setupServer(
  rest.get(`${PROCEDURE_URL}/procedure/all`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        procedureFake({ name: "one", id: "123", status: "pending" }),
        procedureFake({ name: "two", status: "finished" }),
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setUp = (setId = jest.fn()) => {
  return render(
    <MockProvider withQuery withTheme>
      <ProcedureList setId={setId} />
    </MockProvider>
  );
};

describe("ProcedureList", () => {
  it("displays all procedures once they are loaded", async () => {
    const { getByText } = setUp();

    await waitFor(() => {
      expect(getByText("one")).toBeInTheDocument();
      expect(getByText("two")).toBeInTheDocument();
    });
  });
  it("displays the status of the procedure", async () => {
    const { getByText } = setUp();

    await waitFor(() => {
      expect(getByText("Pending")).toBeInTheDocument();
    });
  });
  it("calls setId with the procedure ID when a procedure is selected", async () => {
    const setId = jest.fn();
    const { getByText } = setUp(setId);

    // ensure the list has loaded
    await waitFor(() => getByText("one"));

    await userEvent.click(getByText("one"));

    expect(setId).toHaveBeenCalledWith("123");
  });
});
