import { createHmac } from "crypto";

const hash = (password) => {
  return createHmac("sha256", process.env.PASSWORD_HASH_SECRET)
    .update(password)
    .digest("hex");
};

export default hash;
