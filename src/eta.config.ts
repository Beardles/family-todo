import { Eta } from "npm:eta";

const viewPath = Deno.cwd() + "/src/views/";
const eta = new Eta({ views: viewPath });

export { eta };
