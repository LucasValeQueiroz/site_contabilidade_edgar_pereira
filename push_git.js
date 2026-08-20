const cp = require('child_process');
try {
    cp.execSync('git add -A');
    cp.execSync('git commit -m "feat: adiciona certidoes negativas"');
    console.log(cp.execSync('git push').toString());
} catch (e) {
    console.log("Error:", e.message);
    if (e.stdout) console.log("Stdout:", e.stdout.toString());
    if (e.stderr) console.log("Stderr:", e.stderr.toString());
}
