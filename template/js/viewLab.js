function getURL() {
    var pageURL = $(location).attr("href");
    var parts = pageURL.replace('/', '')
    var labId = parts.slice(parts.lastIndexOf('=') + 1, parts.length);
    return labId;
}
//caller
const Caller = {
    getLab: function () {
        return new Promise(function (res, rej) {
            $.ajax({
                'url': 'getLabPdf?labId=' + getURL(),
                'method': 'GET',
                'success': res,
                'error': rej
            });
        });
    }
}

// model
const Model = {
    lab: null,
    init: function () {
        Caller.getLab()
            .then(Octopus.loadLab)
            .catch(function (e) {
                console.log(e);
                alert('Fail to load lab. Please reload page!');
            });
    }
}

//octopus
const Octopus = {
    init: function () {
        Model.init();
        View.init();
    },
    loadLab: (lab) => {
        Model.lab = lab;
        View.renderLab()
    }, getLab: function () {
        return Model.lab;
    }
}
//views
const View = {
    init: function () {

    },
    renderLab: function () {
        let lab = Octopus.getLab();
        let labObj = JSON.parse(lab);
        $('#excerciseName').html(labObj.Name)
        $('#LOC').html(labObj.LOC)
        loadPdfAndPaging(labObj.Content);
    }
}

$(document).ready(function () {
    Octopus.init();

});
