import express, { ErrorRequestHandler} from "express";
import dotenv from "dotenv";
import cors from "cors";

import globalRateLimiter from "./middlewares/global.rate.limiter";
import routeNotFound from "./middlewares/route.not.found";
import appErrorhandler from "./middlewares/app.error.handler";
import logger from "./middlewares/logger";
import { corsOpts, corsOptsDev} from "./config/cors.config";
import tasksRoutes from "./tasks/tasks.routes";
import dbConnect from "./utils/db.connect";

dotenv.config();
const PORT = process.env.PORT || 8001;
const app = express();

const bootstrap = async () => {
  app.use(globalRateLimiter); // Apply the rate limiter globally to all routes.
  app.use(cors(process.env.NODE_ENV === "development" ? corsOptsDev : corsOpts)); // use cors.
  app.use(logger); // Custom logger middleware.
  app.use(express.urlencoded({extended: true})); 

  app.use("/api/v1/tasks", tasksRoutes);

  app.use(routeNotFound);
  app.use(appErrorhandler as ErrorRequestHandler);

  await dbConnect(); // Test database connection.
  app.listen(PORT, () => {
    console.log(`==> Server up on port: ${PORT}`);
  })
}

bootstrap();