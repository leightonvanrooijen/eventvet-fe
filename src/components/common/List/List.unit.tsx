import {List} from "./List";
import {render} from "@testing-library/react";

describe("List", () => {
  it("displays children", () => {
    const dom = render(<List><div>Child</div><div>Child 2</div></List>)

    expect(dom.getByText("Child")).toBeInTheDocument()
    expect(dom.getByText("Child 2")).toBeInTheDocument()
  })
  it("displays skeleton when loading", async () => {
    const {getAllByTestId} = render(<List loading><div>Child</div><div>Child 2</div></List>)

    expect(getAllByTestId("skeleton")).toHaveLength(4)
  })
})