import {roar} from '@jurassicjs/roar';

export function main() {
  console.log(roar(`Hello from docs/tasks/greet.ts!`));
}

if (import.meta.main) {
  main();
}
