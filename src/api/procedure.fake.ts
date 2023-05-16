import { faker } from "@faker-js/faker";
import { Procedure } from "./Procedure";

export const procedureFake = (overwrites?: Partial<Procedure>): Procedure => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  animalId: faker.string.uuid(),
  status: faker.helpers.arrayElement([
    "pending",
    "inProgress",
    "finished",
  ]) as Procedure["status"],
  consumedGoods: [],
  version: 1,
  ...overwrites,
});
