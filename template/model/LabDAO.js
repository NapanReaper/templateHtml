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
    var labId = param.slice(param.lastIndexOf('=') + 1, param.length);
    console.log("LabId:", labId);
    return labId;
}
exports.getLabInfoById = (labId) => {
    let subject = this.readSubject();
    let subjectArr = this.readAssignmentBySubject(subject);
    const found = subjectArr.find(element => element.Id == labId);
    // console.log("found", found);
    return found
}
exports.getLabInfo = (lab) => {
    let pdfLink = ""
    let labObj = null
    try {
        let subjectId = this.readSubject();
        let pdfPath = path.join(paths.DATA_FOLDER, subjectId, lab.Name, lab.Content)
        pdfLink = pdfPath
        labObj = new Lab(lab.Id, lab.Name, pdfLink, lab.LOC)
        console.log(labObj);
    } catch (err) {
        console.log(err);
    }
    return labObj
}