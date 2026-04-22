const path = require('path');
const { spawn } = require('child_process');

const triggerSeoPrerender = () => {
    const workspaceRoot = path.resolve(__dirname, '../../..');
    const frontendRoot = path.join(workspaceRoot, 'Frontend');
    const scriptPath = path.join(frontendRoot, 'scripts', 'prerender-seo.cjs');

    return new Promise((resolve) => {
        const child = spawn(process.execPath, [scriptPath], {
            cwd: frontendRoot,
            stdio: ['ignore', 'pipe', 'pipe'],
        });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (chunk) => {
            stdout += chunk.toString();
        });

        child.stderr.on('data', (chunk) => {
            stderr += chunk.toString();
        });

        child.on('error', (error) => {
            resolve({
                ok: false,
                code: null,
                stdout,
                stderr: `${stderr}\n${error.message}`.trim(),
            });
        });

        child.on('close', (code) => {
            resolve({
                ok: code === 0,
                code,
                stdout: stdout.trim(),
                stderr: stderr.trim(),
            });
        });
    });
};

module.exports = {
    triggerSeoPrerender,
};
