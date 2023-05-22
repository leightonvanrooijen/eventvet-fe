import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { fetchCreateProcedure } from "../../../api/fetchCreateProcedure";
import { TextInput } from "../../../componentLibrary/components/atoms/TextInput/TextInput";
import { Typography } from "../../../componentLibrary/components/atoms/Text/Typography";

export const CreateProcedure = () => {
  const { handleSubmit, register } = useForm<{ name: string }>();

  const mutation = useMutation({
    mutationFn: fetchCreateProcedure,
  });

  const onSubmit = (data: { name: string }) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Typography variant={"headingSmall"}>Create Procedure</Typography>
        <TextInput label={"Name:"} {...register("name")} />
      </div>
    </form>
  );
};
