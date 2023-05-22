import { AutoComplete } from "../../../componentLibrary/components/molecules/AutoComplete/AutoComplete";
import { Button } from "../../../componentLibrary/components/atoms/Button/Button";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { PreformProcedureForm } from "./PreformProcedure";
import { FormEvent } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const PreformProcedureAddGood = ({
  onSubmit,
  register,
  errors,
  loading = false,
}: {
  onSubmit: (e: FormEvent) => void;
  register: UseFormRegister<PreformProcedureForm>;
  loading?: boolean;
  errors?: any;
}) => {
  const { data } = useQuery({
    queryKey: ["goods"],
    queryFn: async () => {
      const resp = await axios.get("http://localhost:4000/procedure/good/all");
      return resp.data;
    },
    select: (data) => {
      return data.map((d: any) => ({
        id: d.id,
        label: d.name,
      }));
    },
  });

  return (
    <form onSubmit={onSubmit}>
      <StyledHeader>
        <AutoComplete
          label={"Good"}
          required
          {...register("good", {
            required: { value: true, message: "Required field" },
          })}
          options={data ?? []}
          state={errors?.good?.message && "Error"}
          helperText={errors?.good?.message}
        />
        <div style={{ marginLeft: "auto" }}>
          <Button size={"Small"} type="submit" disabled={loading}>
            Add
          </Button>
        </div>
      </StyledHeader>
    </form>
  );
};
