import { Application } from "@oak/oak";
import { useOakServer } from "@dklab/oak-routing-ctrl";

import { RoutesController } from "./controllers/routes.controller.ts";

const app = new Application();

useOakServer(app, [RoutesController]);

await app.listen({ port: 8000 });
