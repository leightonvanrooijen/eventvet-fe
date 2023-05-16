import {render} from "@testing-library/react";
import {Button} from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("displays the text", () => {
    const dom = render(<Button>Button</Button>)

    expect(dom.getByText("Button")).toBeInTheDocument()
  })
  it("triggers the onClick handler when clicked", async () => {
    const onClick = jest.fn()
    const dom = render(<Button onClick={onClick}>Button</Button>)

    await userEvent.click(dom.getByText("Button"))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})