import { Eta } from "npm:eta";
import { join } from "@std/path";

const eta = new Eta({ views: join("src", "views") });

export { eta };
