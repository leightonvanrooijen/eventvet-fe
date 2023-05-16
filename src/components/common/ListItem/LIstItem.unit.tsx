import {render} from "@testing-library/react";
import {ListItem} from "./LIstItem";
import {Menu} from "@headlessui/react";
import userEvent from '@testing-library/user-event'


describe("ListItem", () => {
  it("should display the text", () => {
    const dom = render(<Menu><ListItem text={"List item"} /></Menu>)

    expect(dom.getByText("List item")).toBeInTheDocument()
  })
  it("should display the secondary text if passed in", () => {
    const dom = render(<Menu><ListItem text={"List item"} secondaryText={"Secondary"} /></Menu>)

    expect(dom.getByText("Secondary")).toBeInTheDocument()
  })
  it("should call the onClick handler", async () => {
    const mockOnClick = jest.fn()
    const dom = render(<Menu><ListItem text={"List item"} onClick={mockOnClick} /></Menu>)

    await userEvent.click(dom.getByText("List item"))


    expect(mockOnClick).toHaveBeenCalled()
  })
})