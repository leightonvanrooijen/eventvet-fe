export type Procedure = {
  id: string;
  name: string;
  animalId: string;
  status: "pending" | "inProgress" | "finished";
  consumedGoods: { goodId: string; name: string; quantity: number }[];
  version: number;
};
