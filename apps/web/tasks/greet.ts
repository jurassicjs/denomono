import { roar } from '@jurassicjs/roar';

export function main() {
  console.log(roar(`Hello from web/tasks/greet.ts!`));
}

// if (import.meta.main) {
  main();
// }
