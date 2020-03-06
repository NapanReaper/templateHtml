const fs = require('fs');
const Lab = require('./Lab')
const path = require('path')
const paths = {
    FN_ASSIGNMENT_CSV: 'description.csv'
    , DATA_FOLDER: 'Data'
    , FN_ASSIGNMENTS_JSON: 'assignment.json'
    , FN_SUBJECTS_JSON: 'subject.json'
};
let dataFolderPath = path.join(__dirname, "../../", paths.DATA_FOLDER);
exports.readSubject = () => {
    let subjectPath = path.join(dataFolderPath, paths.FN_SUBJECTS_JSON);
    let subjectId = ""
    try {
        let rawData = fs.readFileSync(subjectPath);
        let obj = JSON.parse(rawData)
        subjectId = obj[Object.keys(obj)[0]].Id;
    } catch (err) {
        console.log(err);
    }
    return subjectId
}
exports.readAssignmentBySubject = (subjectId) => {
    let assignmentPath = path.join(dataFolderPath, subjectId, paths.FN_ASSIGNMENTS_JSON)
    let arr = []
    try {
        if (subjectId !== "") {
            let rawData = fs.
                readFileSync(assignmentPath);
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
exports.getLabId = (param) => {
    var labId = param.slice(param.lastIndexOf('?') + 1, param.length);
    return labId;
}
exports.getLabInfoById = (labId) => {
    let subject = readSubject();
    let subjectArr = readAssignmentBySubject(subject);
    console.log(subjectArr);
}
exports.geLabPdfById = (labName) => {
    let pdfFile = `${labName}.pdf`;
    let pdfLink = null
    try {
        let subjectId = this.readSubject();
        let pdfPath = path.join(dataFolderPath, subjectId, labName, pdfFile)
        pdfLink = pdfPath
    } catch (err) {
        console.log(err);
    }
    return pdfLink
}