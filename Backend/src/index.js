import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Listening on PORT: ${process.env.PORT}`);
    });

    app.on("error", (error) => {
      console.log("MongoDB Connection Error!!!", error);
    });
  })
  .catch((e) => {
    console.log("MongoDB Connection Failed!!!", e);
  });