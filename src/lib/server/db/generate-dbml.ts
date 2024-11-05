import * as schema from "./schema";
import { pgGenerate } from "drizzle-dbml-generator";

const out = "./schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });
console.log("Successfully created the schema.dbml file.");
