import { Controller, Get } from "@dklab/oak-routing-ctrl";

@Controller("/api/v1")
export class TodosController {
  @Get("/todos")
  todos() {
    return [
      {
        id: "1",
        value: "Todo 1",
      },
      {
        id: "2",
        value: "Todo 2",
      },
    ];
  }
}
