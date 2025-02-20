import { Application } from "@oak/oak";

import { router as ApiRouter } from "./routes/api/index.ts";
import { router as AppRouter } from "./routes/app/index.ts";

const app = new Application();

app.use(AppRouter.routes());
app.use(AppRouter.allowedMethods());
app.use(ApiRouter.routes());
app.use(ApiRouter.allowedMethods());

await app.listen({ port: 8000 });
