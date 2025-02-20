import { Router } from "@oak/oak";

const router = new Router();

router.get("/todos", (ctx) => {
  ctx.response.body = JSON.stringify([
    {
      id: "1",
      value: "Todo 1",
    },
    {
      id: "2",
      value: "Todo 2",
    },
  ]);
});

export { router };
