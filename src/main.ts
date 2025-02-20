import { Application, Router } from "@oak/oak";

import { router as ApiRouter } from "./routes/api/index.ts";

const app = new Application();

const appRouter = new Router();

appRouter.get("/", (ctx) => {
  ctx.response.body = `<!DOCTYPE html><head></head><body><h1>Hello Books</h1><body></!DOCTYPE>`;
});

app.use(appRouter.routes());
app.use(appRouter.allowedMethods());
app.use(ApiRouter.routes());
app.use(ApiRouter.allowedMethods());

await app.listen({ port: 8000 });
