// file system module to perform file operations
const fs = require('fs');

// json data
var jsonData = '{"problems":[{"Id":"1","Name":"Bai 1","Contents":"abc.pdf","LOC":"200"},{"Id":"2","Name":"Bai 3","Contents":"abc.pdf","LOC":"200"}]}';

// parse json
var jsonObj = JSON.parse(jsonData);

// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
exports.transfer = (fileName) => {
    // console.log(jsonObj);
    // console.log(jsonContent);
    let dirPath = 'data';
    try {
        //check if dirPath is exists.
        fs.statSync(dirPath);
    } catch (e) {
        fs.mkdirSync(dirPath);
    }
    fs.writeFile(dirPath + `/${fileName}.json`, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
}