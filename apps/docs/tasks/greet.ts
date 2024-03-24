import { roar } from "../../../packages/roar/mod.ts";

export function main() {
  console.log(roar(`Hello from docs/tasks/greet.ts!`));
}

if (import.meta.main) {
  main();
}
