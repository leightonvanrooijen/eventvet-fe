import { TextInput } from "./TextInput";
import { ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { log } from "util";
import { Button } from "../Button/Button";

const defaultArgs = {
  label: "Label",
};

export default {
  title: "atoms/TextInput",
  component: TextInput,
  args: defaultArgs,
} as ComponentMeta<typeof TextInput>;

export const Default = {};

export const ErrorState = {
  args: { helperText: "Helper text appears here", state: "Error" },
};

export const Required = {
  args: { required: true },
};

export const WithHelperText = {
  args: { helperText: "Helper text appears here" },
};

export const WithLongHelperText = {
  args: {
    helperText: "Helper text appears here but it wraps when it gets too long",
  },
};

export const WithClear = {
  args: { clearable: true },
};
export const WithDefaultValue = {
  args: { defaultValue: "Leighton van Rooijen" },
};

export const WithLongValue = {
  args: { defaultValue: "Leighton von van Hoozle Doozle" },
};

export const WithForm = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { register, handleSubmit } = useForm();

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <TextInput {...defaultArgs} {...register("good")} clearable />
      </form>
    );
  },
};
