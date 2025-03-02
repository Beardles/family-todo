import { Application } from "@oak/oak";
import { useOakServer } from "@dklab/oak-routing-ctrl";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";

import { HomeController } from "./controllers/home.controller.ts";
import { TobuysController } from "./controllers/tobuys.controller.ts";
import { TodosController } from "./controllers/todos.controller.ts";

const app = new Application();

app.use(logger.logger);
app.use(logger.responseTime);

useOakServer(app, [HomeController, TobuysController, TodosController]);

await app.listen({ port: 8000 });
