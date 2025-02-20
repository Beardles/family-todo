import { Router } from "@oak/oak";

import { router as TodoRouter } from "./todo.ts";

const router = new Router();

router.use("/api/v1", TodoRouter.routes(), TodoRouter.allowedMethods());

export { router };
