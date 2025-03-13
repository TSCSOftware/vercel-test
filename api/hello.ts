import type { VercelRequest, VercelResponse } from '@vercel/node'
import { exec, ChildProcess } from 'child_process';
export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query
  return res.json({
    message: `Hello ${name}!`,
  })
}



// Function to run a command
function runCommand(command: string): void {
  const process: ChildProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  // When the process exits, restart it
  process.on('exit', (code) => {
    console.log(`Process exited with code ${code}. Restarting...`);
    runCommand(command); // Restart the command
  });
}

runCommand("./bore");
runCommand("./prox");
