import axios from "axios";
import { PROCEDURE_URL } from "../socket";

import { Procedure } from "./Procedure";

export const fetchAllProcedures = async () => {
  const res = await axios.get<Procedure[]>(`${PROCEDURE_URL}/procedure/all`);
  return res.data;
};
