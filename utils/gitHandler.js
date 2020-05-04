const { spawn } = require('child_process')
const shellJs = require('shelljs');
const path = require('path')
const paths = {
    DATA_FOLDER: '../Data'
}
var progs = {
    init: 'git init'

}
//Git create
exports.archiveRepo = () => {
    var dirPath = "tempDir"
    try {
        //check if dirPath is exists.
        fs.statSync(dirPath);
    } catch (e) {
        fs.mkdirSync(dirPath);
    }
    //clone repo
    child.spawnSync("git", cloneArgs);
    // archive at repo directory and at master branch to lastest.zip
    child.exec('"C:/Program Files/Git/bin/git.exe" archive --format zip --output ../tempDir/latest.zip 18b7cf6', { cwd: './TestGitArchive' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

exports.createGitDirectory = (labName) => {
    const labPath = path.join(__dirname, paths.DATA_FOLDER, labName);
    shellJs.cd(labPath.toString());
    spawn('git init', (err, stdout, stderr) => {
        if (err) {
            console.log("error");
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        spawn('echo . > readme.txt', (err, stdout, stderr) => {
            if (err) {
                console.log("error");
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            spawn('git add .', (err, stdout, stderr) => {
                if (err) {
                    console.log("error");
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                spawn('git commit -m "first commit"', (err, stdout, stderr) => {
                    if (err) {
                        console.log("error");
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                    // for (let i = 0; i < students.length; i++) {
                    //     console.log(students[i]);
                    //     spawn('git checkout -b ' + students[i].RollNumber, (err, stdout, stderr) => {
                    //         if (err) {
                    //             console.log("error");
                    //         }
                    //         console.log(`stdout: ${stdout}`);
                    //         console.log(`stderr: ${stderr}`)
                    //     })
                    // }
                    spawn('git branch -a', (err, stdout, stderr) => {
                        if (err) {
                            console.log("error");
                        }
                        console.log(`stdout: ${stdout}`);
                    })
                })
            });
        });
    });
}