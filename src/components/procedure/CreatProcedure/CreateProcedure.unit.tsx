import { setupServer } from "msw/node";
import { rest } from "msw";
import { PROCEDURE_URL } from "../../../socket";
import { render } from "@testing-library/react";
import { CreateProcedure } from "./CreateProcedure";
import { MockProvider } from "../../../packages/test/MockProvider";
import userEvent from "@testing-library/user-event";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setUp = () => {
  return render(
    <MockProvider withQuery>
      <CreateProcedure />
    </MockProvider>
  );
};

describe("CreateProcedure", () => {
  it("creates a procedure with the name entered into form", async () => {
    const { getByLabelText } = setUp();
    const requestMade = jest.fn();

    server.use(
      rest.post(`${PROCEDURE_URL}/procedure/create`, (req, res, ctx) => {
        requestMade();
        return res(ctx.status(200), ctx.json({ message: "success" }));
      })
    );

    const nameInput = getByLabelText("Name:");

    await userEvent.type(nameInput, "Procedure");
    await userEvent.type(nameInput, "{enter}");

    expect(requestMade).toHaveBeenCalled();
  });
});
