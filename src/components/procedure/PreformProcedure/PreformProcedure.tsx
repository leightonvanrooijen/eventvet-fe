import { useQuery } from "@tanstack/react-query";
import { Procedure } from "../../../api/Procedure";
import { Option } from "../../../componentLibrary/components/molecules/AutoComplete/AutoComplete";
import { PreformProcedureHeading } from "./PreformProcedure.Heading";
import { useForm } from "react-hook-form";
import { fetchGoToNextStatus } from "../../../api/fetchGoToNextStatus";
import { fetchConsumeGood } from "../../../api/fetchConsumeGood";
import { fetchProcedure } from "../../../api/fetchProcedure";
import { PreformProcedureAddGood } from "./PreformProcedure.AddGood";
import { SnackBar } from "../../../componentLibrary/components/molecules/SnackBar/SnackBar";
import { useMutate } from "../../../api/useMutate";
import { PreformProcedureLoading } from "./PreformProcedure.loading";
import styled from "styled-components";
import { Typography } from "../../../componentLibrary/components/atoms/Text/Typography";

export const STATUS_MAP = {
  pending: "Pending",
  inProgress: "In Progress",
  finished: "Completed",
};

export const NEXT_STATUS_ACTION = {
  pending: "Begin",
  inProgress: "Complete",
  finished: "Go to Invoice",
};

export const NEXT_STATUS_ENDPOINT = {
  pending: "/procedure/begin",
  inProgress: "/procedure/finish",
};

export type PreformProcedureForm = { good: Option };

export const PreformProcedure = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreformProcedureForm>();

  const {
    data: procedure,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["procedure", id],
    queryFn: ({ queryKey }) => fetchProcedure(queryKey[1]),
  });
  const mutateConsumeGood = useMutate(fetchConsumeGood);
  const mutateNextStatus = useMutate(fetchGoToNextStatus);

  const onAddButton = (procedure: Procedure, data: { good: Option }) => {
    mutateConsumeGood.mutate({
      id: procedure?.id,
      version: procedure?.version,
      goodId: data.good.id,
    });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        maxWidth: "800px",
        paddingTop: "0.5rem",
        marginLeft: "2rem",
      }}
    >
      {isLoading && <PreformProcedureLoading />}
      {procedure && (
        <>
          <PreformProcedureHeading
            procedure={procedure}
            onNextStatusClick={mutateNextStatus.mutate}
            loading={mutateNextStatus.isLoading}
          />
          <PreformProcedureAddGood
            onSubmit={handleSubmit((data) => onAddButton(procedure, data))}
            register={register}
            errors={errors}
            loading={mutateConsumeGood.isLoading || mutateNextStatus.isLoading}
          />
          <div style={{ paddingTop: "20px" }}>
            <Typography variant={"headingXSmall"}>Consumed Goods</Typography>
            {procedure.consumedGoods.map((good) => (
              <div key={good.goodId}>
                {good.name} {good.quantity}
              </div>
            ))}
          </div>
        </>
      )}
      <SnackBar
        variant={"Error"}
        message={mutateConsumeGood.error?.message ?? ""}
      />
    </div>
  );
};
