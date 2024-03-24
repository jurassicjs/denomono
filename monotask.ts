
// Read the deno.json file
import denoConfig from "./deno.json" with { type: "json" };
import { parseArgs } from "https://deno.land/std@0.220.1/cli/parse_args.ts";
const parsedArgs = parseArgs(Deno.args);

console.log('denoConfig:-->',denoConfig);
// Extract the workspaces
const workspaces = denoConfig.workspaces;

// Get the command to run from the command line arguments
const command = parsedArgs;

console.log('command:-->',command);
for (const workspace of workspaces) {
  console.log('workspace:-->',workspace);
  const taskScriptPath = `./${workspace}/tasks/${command}.ts`;
  console.log('taskScriptPath:-->',taskScriptPath);

    console.log(taskScriptPath);
    const p = new Deno.Command(Deno.execPath(),{
      args: ["task", "greet"],
      cwd: taskScriptPath,
      stderr: "piped",
    });

    const { code, stdout, stderr } = p.outputSync();
    // console.assert(code === 0);
    if (code !== 0) {
      const stderrString = new TextDecoder().decode(stderr);

      console.error('error code: ', code);
      console.error('error: ', stderrString);
      Deno.exit(code);
    }
    console.log(new TextDecoder().decode(stdout))
  }

