import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../src/config/db";
import { User } from "../src/models/User";

async function run() {
  const email = process.env.ADMIN_EMAIL || "admin@formotex.com";
  const password = process.env.ADMIN_PASSWORD || "Admin123!";
  const name = process.env.ADMIN_NAME || "Admin";

  await connectDB(
    process.env.MONGO_URI_LOCAL ||
      "mongodb://localhost:27017/formotex_inventory"
  );

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin ya existe:", email);
    process.exit(0);
  }

  await User.create({ name, email, password, role: "admin" });
  console.log("Admin creado:", email);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
