import { Users } from "../models";

const dbInit = async () => {
  const force = process.env.FORCE_SYNC_DB === "true";
  await Users.sync({ force: force });
};

export default dbInit;
