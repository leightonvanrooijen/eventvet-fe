import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PROCEDURE_URL } from "../../../socket";
import { Procedure } from "../../../api/Procedure";
import { Button } from "../../common/Button/Button";
import { Autocomplete } from "../../common/Autocomplete/Autocomplete";
import { useForm } from "react-hook-form";

export const STATUS_MAP = {
  pending: "Pending",
  inProgress: "In Progress",
  finished: "Completed",
};

const NEXT_STATUS_ACTION = {
  pending: "Begin",
  inProgress: "Complete",
  finished: "Go to Invoice",
};

const NEXT_STATUS_ENDPOINT = {
  pending: "/procedure/begin",
  inProgress: "/procedure/finish",
};

export const PreformProcedure = ({ id }: { id: string }) => {
  const { data: procedure, error } = useQuery({
    queryKey: ["procedure", id],
    queryFn: async () => {
      const res = await axios.get<Procedure>(
        `${PROCEDURE_URL}/procedure/${id}`
      );
      return res.data;
    },
  });

  const mutateNextStatus = useMutation({
    mutationKey: ["nextStatus", id],
    mutationFn: async ({
      status,
      version,
    }: {
      status: "pending" | "inProgress";
      version: number;
    }) => {
      const res = await axios.post(
        `${PROCEDURE_URL}${NEXT_STATUS_ENDPOINT[status]}`,
        { id, expectedVersion: version }
      );
      return res.data;
    },
  });

  const onStatusButtonClick = (
    status: "pending" | "inProgress" | "finished",
    version: number
  ) => {
    if (status === "pending" || status === "inProgress") {
      mutateNextStatus.mutate({ status, version });
    }
  };

  const mutateConsumeGood = useMutation({
    mutationKey: ["consumeGood", id],
    mutationFn: async ({
      id,
      version,
      goodId,
    }: {
      id: string;
      goodId: string;
      version: number;
    }) => {
      const res = await axios.post(`${PROCEDURE_URL}/procedure/consumeGood`, {
        id,
        goodId,
        quantity: 1,
        expectedVersion: version,
      });
      return res.data;
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    console.log(form["good[value]"].value);

    mutateConsumeGood.mutate({
      id: procedure?.id as string,
      version: procedure?.version as number,
      goodId: form["good[value]"].value,
    });
  };

  return (
    <div className="flex flex-col w-full max-w-xl h-full p-2">
      {procedure && (
        <>
          <div className="flex bg-white  p-2 rounded">
            <div>
              <p className="text-2xl font-semibold">{procedure.name}</p>
              <p className="text-sm">{STATUS_MAP[procedure.status]}</p>
            </div>
            <div className="ml-auto">
              <Button
                onClick={() =>
                  onStatusButtonClick(procedure.status, procedure.version)
                }
              >
                {NEXT_STATUS_ACTION[procedure.status]}
              </Button>
            </div>
          </div>
        </>
      )}
      {procedure && (
        <form onSubmit={onSubmit}>
          <div className="flex items-center mt-2 bg-white p-2 pb-3 rounded">
            <Autocomplete
              options={[
                { value: "1", text: "Medication" },
                { value: "2", text: "Surgery" },
                { value: "3", text: "Vaccination" },
              ]}
              name={"good"}
            />
            <div className="ml-auto">
              <Button type="submit">Add</Button>
            </div>
          </div>
        </form>
      )}
      {procedure && procedure.consumedGoods.length > 0 && (
        <div className="flex flex-col flex-1 mt-2 bg-white p-3 rounded">
          <p className="text-xl font-semibold">Consumed Goods</p>
          <div className="flex flex-col mt-2"></div>
          <div className="flex items-center mt-2">
            <p className="w-32 font-semibold underline">Good</p>
            <div className="ml-8">
              <p className="font-semibold underline">Qty</p>
            </div>
          </div>
          {procedure.consumedGoods.map((good) => (
            <div key={good.goodId} className="flex items-center mt-2">
              <div className="w-32">
                <p>{good.name}</p>
              </div>
              <div className="ml-8 w-8 flex">
                <p className="ml-2">{good.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
