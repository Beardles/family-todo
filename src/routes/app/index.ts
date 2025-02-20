import { Router } from "@oak/oak";

import { eta } from "../../config.ts";
import { router as TodoRouter } from "./todo.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = eta.render("index", { name: "Robbie" });
});

router.use("/todos", TodoRouter.routes(), TodoRouter.allowedMethods());

export { router };
