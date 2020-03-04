function getURL() {
    var pageURL = $(location).attr("href");
    var parts = pageURL.split("/");
    var result = parts[parts.length - 1];
    return result;
}
//caller
const Caller = {
    getLab: function () {
        return new Promise(function (res, rej) {
            $.ajax({
                'url': getURL() + '.json',
                'method': 'get',
                'success': res,
                'error': rej
            });
        });
    }
}

// model
const Model = {
    labs: [],
    init: function () {
        Caller.getLab("")
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
    loadLab: (labs) => {
        Model.labs = labs;
        View.renderLab(labs)
    }, getLab: function () {
        return Model.labs;
    },
}
//views
const View = {
    init: function () {

    },
    renderLab: function () {
        let lab = Octopus.getLab();
        console.log(lab);
        $('#excerciseName').html(lab.Name)
        $('#LOC').html(lab.LOC)
        loadPdfAndPaging(lab.Contents);
    }
}

$(document).ready(function () {
    Octopus.init();

});
