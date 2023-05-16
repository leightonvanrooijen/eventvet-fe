import {render} from "@testing-library/react";
import {Sidebar} from "./Sidebar";

export {}
describe("SideBar", () => {
  it("should display children", () => {
    const {getByText} = render(<Sidebar><p>Test</p></Sidebar>);

    expect(getByText("Test")).toBeInTheDocument();
  });
})