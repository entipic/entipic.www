require("dotenv").config();

import express from "express";
import { logger } from "./logger";
import { NextFunction, Response, Request } from "express";
import { initData } from "./data";
import { join } from "path";
import links from "./links";
import config from "./config";
import routes from "./routes";

const PORT = process.env.PORT;

async function start() {
  const server = express();

  server.disable("x-powered-by");

  server.use(
    express.static(join(__dirname, "..", "public"), {
      maxAge: process.env.MODE === "dev" ? 0 : 1000 * 60 * 15
    })
  );

  // app locals
  server.locals.links = links;
  server.locals.config = config;

  // app routes
  routes(server);

  server.use((_req, res) => res.sendStatus(404).end());

  server.use(
    (err: Error, _req: Request, res: Response, _next: NextFunction) => {
      logger.error(err.message, err);
      res.status(500).send(err.message);
    }
  );

  await initData();
  server.listen(PORT);
}

process.on("unhandledRejection", function (error: Error) {
  logger.error("unhandledRejection: " + error.message, error);
});

process.on("uncaughtException", function (error: Error) {
  logger.error("uncaughtException: " + error.message, error);
});

start()
  .then(() => logger.warn(`Listening at ${PORT}`))
  .catch((e) => {
    logger.error(e);
  });
