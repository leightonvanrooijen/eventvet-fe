import { setupServer } from "msw/node";
import { rest } from "msw";
import { PROCEDURE_URL } from "../../../socket";
import { procedureFake } from "../../../api/procedure.fake";
import { render, waitFor } from "@testing-library/react";
import { PreformProcedure } from "./PreformProcedure";
import { MockProvider } from "../../../packages/test/MockProvider";
import { userEvent } from "@storybook/testing-library";

const server = setupServer();
const id = "123";
const setUp = ({
  consumeGood = jest.fn(),
  begin = jest.fn(),
  finish = jest.fn(),
  procedure = procedureFake({ name: "one", id, status: "pending" }),
} = {}) => {
  server.use(
    rest.get(`${PROCEDURE_URL}/procedure/${id}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(procedure));
    }),
    rest.post(`${PROCEDURE_URL}/procedure/consumeGood`, (req, res, ctx) => {
      consumeGood();
      return res(ctx.status(200), ctx.json({ message: "success" }));
    }),
    rest.post(`${PROCEDURE_URL}/procedure/begin`, (req, res, ctx) => {
      begin();
      return res(ctx.status(200), ctx.json({ message: "success" }));
    }),
    rest.post(`${PROCEDURE_URL}/procedure/finish`, (req, res, ctx) => {
      finish();
      return res(ctx.status(200), ctx.json({ message: "success" }));
    })
  );

  return render(
    <MockProvider withQuery withTheme>
      <PreformProcedure id={id} />
    </MockProvider>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PreformProcedure", () => {
  it("Begins the procedure when the user clicks the begin button - if the status is pending", async () => {
    const begin = jest.fn();
    const { getByText } = setUp({ begin });

    await waitFor(() => userEvent.click(getByText("Begin")));

    expect(begin).toHaveBeenCalled();
  });
  it("Finishes the procedure when the user clicks the finish button - if the status is inProgress", async () => {
    const finish = jest.fn();
    const procedure = procedureFake({ status: "inProgress", id });
    const { getByText } = setUp({ finish, procedure });

    await waitFor(() => userEvent.click(getByText("Complete")));

    expect(finish).toHaveBeenCalled();
  });
  it("Adds a good to the procedure when a good is selected and the add button is clicked", async () => {
    const consumeGood = jest.fn();
    const procedure = procedureFake({ status: "inProgress", id });
    const { getByText, getByRole } = setUp({ procedure, consumeGood });

    await waitFor(async () => {
      userEvent.click(getByRole("textbox"));
      await userEvent.click(getByText("Medication"));
      userEvent.click(getByText("Add"));
    });

    expect(consumeGood).toHaveBeenCalled();
  });
});
