const fs = require('fs')

exports.httpListener = (ip) => {
    let newdate = getCurrentDate();
    checkIp(ip, newdate)
}
function getCurrentDate() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day;
    return newdate;
}
function checkIp(ip, currentdate) {
    try {
        let rawdata = fs.readFileSync(`./data/SE1626_LAB321/${currentdate}.json`)
        let student = JSON.parse(rawdata);
        let rollNumber = ""
        student.forEach(element => {
            if (element.IpAddress === ip) {
                rollNumber = element.RollNumber;
            }
        });
        console.log(`rollNumber : ${rollNumber}`);
    } catch (err) {
        console.log(err);
    }
}