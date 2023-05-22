import axios from "axios";
import { Procedure } from "./Procedure";
import { PROCEDURE_URL } from "../socket";

export const fetchProcedure = async (id: string) => {
  const res = await axios.get<Procedure>(`${PROCEDURE_URL}/procedure/${id}`);
  return res.data;
};
