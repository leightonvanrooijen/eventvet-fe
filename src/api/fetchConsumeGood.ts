import { PROCEDURE_URL } from "../socket";
import { fetchPost } from "./fetchPost";

export type ConsumeGoodInput = {
  id: string;
  goodId: string;
  version: number;
};

export const fetchConsumeGood = async ({
  id,
  version,
  goodId,
}: ConsumeGoodInput): Promise<{ message: string }> => {
  return fetchPost<{ message: string }>(
    `${PROCEDURE_URL}/procedure/consumeGood`,
    {
      id,
      goodId,
      quantity: 1,
      expectedVersion: version,
    }
  );
};
