const { exec } = require('child_process');

module.exports = (req, res) => {
  const { name = 'World' } = req.query;
  return res.json({
    message: `Hello ${name}!`,
  });
};

// Function to run a command
function runCommand(command) {
  const process = exec(command, (error, stdout, stderr) => {
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
