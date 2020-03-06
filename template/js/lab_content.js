//caller
const Caller = {
    getLab: function () {
        return new Promise(function (res, rej) {
            $.ajax({
                'url': 'getLab',
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
        Model.labs = labs;
        View.renderLab()
    }, getLabs: function () {
        return Model.labs;
    },
}
//views
const View = {
    mainTable: null,
    init: function () {
        this.mainTable = $('#example').DataTable({
            data: [],
            columns: [
                { data: 'Id' },
                { data: 'Name' },
                { data: 'Content' },
                { data: 'LOC' },
                {
                    render: function (data, type, row, meta) {
                        return `<a class="btn btn-primary" href="viewLab?labId=${row.Id}" role="button">View Detail</a>`
                    }
                }
            ]
        });
    },
    renderLab: function () {
        let labs = Octopus.getLabs();
        View.mainTable.clear();
        labs = JSON.parse(labs);
        labs.forEach(e => {
            View.mainTable.row.add(e);
        });
        View.mainTable.draw();
    }
}

$(document).ready(function () {
    Octopus.init();
});
