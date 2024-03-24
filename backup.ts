
import denoConfig from "./deno.json" with { type: "json" };
import { parseArgs } from "https://deno.land/std@0.220.1/cli/parse_args.ts";
const parsedArgs = parseArgs(Deno.args);
const workspaces = denoConfig.workspaces;
const command = parsedArgs._[0] as string;

for (const workspace of workspaces) {
  console.log('workspace:-->',workspace);
  const fullTaskScriptPath = `${workspace}/tasks/${command}.ts`;


  console.log('fullTaskScriptPath:-->',fullTaskScriptPath);

    const denoCommand = new Deno.Command(Deno.execPath(),{
      args: ["task", command],
      cwd: workspace,
      stderr: "piped",
    });

    const { code, stdout, stderr } = await denoCommand.output();
    // console.assert(code === 0);
    if (code !== 0) {
      const stderrString = new TextDecoder().decode(stderr);

      console.error('error code: ', code);
      console.error('error: ', stderrString);
      Deno.exit(code);
    }
    console.log(new TextDecoder().decode(stdout))
  }

