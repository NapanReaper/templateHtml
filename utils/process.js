const { exec } = require('child_process');
exports.openFromTemplate = exec('"C:/Program Files/NetBeans 8.2/bin/netbeans.exe" --open C:/Users/Admin/OneDrive/Desktop/DemoProjectTemplate',
    (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
exports.openMSSQL = exec('"C:/Program Files (x86)/Microsoft SQL Server/140/Tools/Binn/ManagementStudio/Ssms.exe"', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});