//caller
const Caller = {
    getLab: function () {
        return new Promise(function (res, rej) {
            $.ajax({
                'url': './labs.json',
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
        Caller.getLab()
            .then(Octopus.loadLabs)
            .catch(function (e) {
                console.log(e);
                alert('Fail to load lab list. Please reload page!');
            });
    }
}

//octopus
const Octopus = {
    init: function () {
        Model.init();
        View.init();
    },
    loadLabs: (labs) => {
        Model.labs = labs.problems;
        View.renderLab(labs)
    }, getLabs: function () {
        return Model.labs;
    },
}
//views
const View = {
    init: function () {

    },
    renderLab: function () {
        let labs = Octopus.getLabs();
        const labDisplay = document.querySelector('.entry-body')
        $('#example').DataTable({
            data: labs,
            columns: [
                { data: 'Id', title: 'Id' },
                { data: 'Name', title: 'Name' },
                { data: 'Contents', title: 'Contents' },
                { data: 'LOC', title: 'LOC' },
                { data: 'Id', tittle: 'Action' }
            ], "initComplete": function (settings, json) {
                $("#example tbody tr").each(function (index, tr) {
                    var lines = $('td', tr).map(function (index, td) {
                        return $(td).text();
                    });
                    $(this).find("td:last-child").html(`<a class="btn btn-primary" href="${lines[4]}" role="button">View Detail</a>`);
                });
            }
        });
    }
}

$(document).ready(function () {
    Octopus.init();
});
