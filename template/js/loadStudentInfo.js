$(document).ready(function () {
    $.getJSON("/SE62826.json", function (json) {
        var jsonData = JSON.stringify(json)
        var jsonObj = JSON.parse(jsonData);
        $('#studentId').html(jsonObj.studentCode);
        $('#studentName').html(jsonObj.name);
    });
});