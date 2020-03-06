//caller
const Caller = {
    getLab: function () {
        return new Promise(function (res, rej) {
            $.ajax({
                'url': 'getLabPdf',
                'method': 'GET',
                'success': res,
                'error': rej
            });
        });
    }
}

// model
const Model = {
    labs: null,
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
    loadLab: (labs) => {
        Model.labs = labs;
        View.renderLab()
    }, getLab: function () {
        return Model.labs;
    }
}
//views
const View = {
    init: function () {

    },
    renderLab: function () {
        let labs = Octopus.getLab();
        console.log(labs);

        // console.log(lab);
        // $('#excerciseName').html(lab.Name)
        // $('#LOC').html(lab.LOC)
        loadPdfAndPaging(labs);
    }
}

$(document).ready(function () {
    Octopus.init();

});
