import { Controller, Get } from "@dklab/oak-routing-ctrl";

import { eta } from "../../views/config.ts";

@Controller("/")
export class HomeController {
  @Get("/")
  index() {
    return eta.render("index", { name: "Robbie" });
  }
}
