import { createApi } from "@prsm/grove";
import express from "express";
import { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import SocketAuthTracker from "./app/services/auth";

const globalMiddleware = [
  (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    return next();
  },
];

const app = express();
const server = createServer(app);

app.disable("x-powered-by");
app.set("x-content-type-options", "nosniff");
app.set("x-ua-compatible", "ie=edge");
app.set("x-xss-protection", "1; mode=block");
app.set("view engine", "ejs");
app.set("views", path.join("./src/", process.env.VIEWS_PATH ?? "/views/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalMiddleware);

try {
  const prism = await createApi("app", app, server);

  // SocketAuthTracker requires prism.wss, so it's initialized after createApi happens.
  SocketAuthTracker.init(prism);

  const port = process.env.PORT || 4000;

  prism.server.listen(port);
  prism.server.on("listening", () => {
    console.log(`\n\t* Listening on port ${port}`);
    console.log("\t* Press CTRL-C to stop");
  });
} catch (e) {
  process.exit(1);
}
