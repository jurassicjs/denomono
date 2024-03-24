
import denoConfig from "./deno.json" with { type: "json" };
import { parseArgs } from "https://deno.land/std@0.220.1/cli/parse_args.ts";
import chalk from "npm:chalk";


const parsedArgs = parseArgs(Deno.args);
const workspaces = denoConfig.workspaces;
const command = parsedArgs._[0] as string;

const promises = [];
const colors: string[] = [
  "#007FFF", // Blue
  "#00FF00", // Green
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#90EE90", // Light Green
  "#4169E1", // Royal Blue
];

let colorCounter = 0;
for (const workspace of workspaces) {
  const chalkName = chalk.hex(colors[colorCounter]);
  // Construct the path to the task script in the workspace
  const taskScriptPath = `${workspace}/tasks/${command}.ts`;
  console.log(chalkName('Running task in: ', taskScriptPath, '\n'));
  // Start the server in a separate async function
  const promise = (async () => {
    const cmd = new Deno.Command(Deno.execPath(), {
      args: ["task", command],
      cwd: workspace,
      stderr: "piped",
      stdout: "piped",
    })
    const proc = cmd.spawn(); // Spawn the process

  // Read stdout in chunks
  const stdoutReader = proc.stdout.getReader();
  while (true) {
    const { done, value } = await stdoutReader.read();
    if (done) break; 

    const text = new TextDecoder().decode(value);
    console.log(chalkName(`Output from ${workspace}:`), text);
  }

  // Read stderr in chunks 
  const stderrReader = proc.stderr.getReader();
  while (true) {
    const { done, value } = await stderrReader.read();
    if (done) break; 

    const text = new TextDecoder().decode(value);
    console.error(`Error from ${workspace}:`, text);
  }
    

  // Wait for the server to finish for error handling (no promises)
  const { code, stdout, stderr } = await cmd.output();
     const stdoutString = new TextDecoder().decode(stdout);
    console.log(`Output from ${workspace}:`, stdoutString);

    if (code !== 0) {
      const stderrString = new TextDecoder().decode(stderr);

      console.error('error code: ', code);
      console.error('error: ', stderrString);
      Deno.exit(code);
    }
    console.log(new TextDecoder().decode(stdout))
  })();

  // Add the promise to the array
  promises.push(promise);
  colorCounter++;
}

// Wait for all servers to finish
await Promise.all(promises);

