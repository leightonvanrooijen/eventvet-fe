import axios from "axios";
import { PROCEDURE_URL } from "../socket";
import { NEXT_STATUS_ENDPOINT } from "../components/procedure/PreformProcedure/PreformProcedure";

type NextStatusInput = {
  status: "pending" | "inProgress";
  version: number;
  id: string;
};
export const fetchGoToNextStatus = async ({
  status,
  version,
  id,
}: NextStatusInput) => {
  const res = await axios.post(
    `${PROCEDURE_URL}${NEXT_STATUS_ENDPOINT[status]}`,
    { id, expectedVersion: version }
  );
  return res.data;
};
