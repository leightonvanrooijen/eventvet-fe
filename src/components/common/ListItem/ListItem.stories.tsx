import {Meta, StoryObj} from "@storybook/react";
import {ListItem} from "./LIstItem";
import {Menu} from "@headlessui/react";

const meta: Meta<typeof ListItem> = {
  title: 'ListItem',
  component: ListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Primary: Story = {
  render: (args) => {
    return (
      <Menu>
        <Menu.Items
          static
          className="absolute mt-2 w-56 divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ListItem text={"List item"} />
        </Menu.Items>
      </Menu>
    )
  },
  args: {},
};