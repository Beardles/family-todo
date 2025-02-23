import { Application } from "@oak/oak";
import { useOakServer } from "@dklab/oak-routing-ctrl";

import { HomeController } from "./controllers/app/home.controller.ts";
import { TodosApiController } from "./controllers/api/v1/todosApi.controller.ts";

const app = new Application();

useOakServer(app, [HomeController, TodosApiController]);

await app.listen({ port: 8000 });
