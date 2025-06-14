import sequelize from "./config/database";
import Express from "express";
import { json } from "body-parser";
import appRouter from "./routes";
import dbInit from "./config/db_init";
import firebase from "./config/firebase";

var app = Express();

app.use(json());
app.use("/api", appRouter);

app.listen(process.env.PORT || 8080, async () => {
  try {
    console.log("Server starting!");

    console.log("Firebase initialized successfully with app " + firebase.name);
    await sequelize.authenticate();
    dbInit();
    console.log("DB initialized successfully!");
    console.log("Server running!");
  } catch (err) {
    console.log(err);
  }
});

export default app;
