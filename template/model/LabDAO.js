const fs = require('fs');
const Lab = require('./Lab')

exports.readSubject = () => {
    let subjectId = ""
    try {
        let rawData = fs.readFileSync(`./Data/subject.json`);
        let obj = JSON.parse(rawData)
        subjectId = obj[Object.keys(obj)[0]].Id;
    } catch (err) {
        console.log(err);
    }
    return subjectId
}
exports.readAssignmentBySubject = (subjectId) => {
    let arr = []
    try {
        if (subjectId !== "") {
            let rawData = fs.readFileSync(`./Data/${subjectId}/assignment.json`);
            let obj = JSON.parse(rawData)
            for (const property in obj) {
                arr.push(obj[property]);
            }

        }
    } catch (err) {
        console.log(err);
    }
    return arr;
}