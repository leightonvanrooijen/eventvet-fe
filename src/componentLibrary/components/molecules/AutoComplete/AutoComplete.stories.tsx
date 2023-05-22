import { ComponentMeta } from "@storybook/react";
import { AutoComplete } from "./AutoComplete";
import { useForm } from "react-hook-form";

const defaultArgs = {
  label: "Label",
  options: [
    { label: "Item 1", subLabel: "xyz", id: "xm" },
    { label: "Item 2", subLabel: "kzl", id: "xssm" },
  ],
};

export default {
  title: "Molecules/Auto Complete",
  component: AutoComplete,
  args: defaultArgs,
} as ComponentMeta<typeof AutoComplete>;

export const Default = {};

export const WithRequired = {
  args: { required: true },
};
export const WithHelperText = {
  args: { helperText: "This field is required" },
};

export const ErrorState = {
  args: { state: "Error", helperText: "This field is required" },
};

export const WithForm = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { register, handleSubmit } = useForm();

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <AutoComplete {...defaultArgs} {...register("good")} />
        <button type="submit">Submit</button>
      </form>
    );
  },
};

export const Two = () => {
  return (
    <div>
      <AutoComplete {...defaultArgs} />
      <AutoComplete {...defaultArgs} />
    </div>
  );
};
