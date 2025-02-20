import { Router } from "@oak/oak";

const router = new Router();

router.get("/", (ctx) => {
  console.log("HERE");
  ctx.response.body = `<!DOCTYPE html><head></head><body><h1>Hello Todos</h1><body></html>`;
});

export { router };
