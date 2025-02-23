import { Application } from "@oak/oak";
import { useOakServer } from "@dklab/oak-routing-ctrl";

import { RoutesController } from "./controllers/routes.controller.ts";
import { TodosController } from "./controllers/api/v1/todos.controller.ts";

const app = new Application();

useOakServer(app, [RoutesController, TodosController]);

await app.listen({ port: 8000 });
