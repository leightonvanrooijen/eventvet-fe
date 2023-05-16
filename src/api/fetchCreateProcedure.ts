import axios from "axios";
import { PROCEDURE_URL } from "../socket";

export const fetchCreateProcedure = async (procedure: { name: string }) => {
  return axios.post(`${PROCEDURE_URL}/procedure/create`, {
    ...procedure,
    animalId: "1",
  });
};
