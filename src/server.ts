import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () =>
    console.log(`?? Server listo en http://localhost:${PORT}`)
  );
}

bootstrap();
