import { TextField } from "../../common/TextField/TextField";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { fetchCreateProcedure } from "../../../api/fetchCreateProcedure";

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
      <div className="m-2">
        <p className="mt-2 mb-2 font-bold">Create Procedure</p>
        <TextField label={"Name:"} {...register("name")} />
      </div>
    </form>
  );
};
