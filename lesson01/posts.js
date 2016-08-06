$(document).ready(function () {
    var posts = Data.getPosts();

    var postsRow = $('#posts-json-template').html();
    var postsRowTemplate = Handlebars.compile(postsRow);

    var postsTable = $('#posts-table-template').html();
    var postsTableTemplate = Handlebars.compile(postsTable);

    Handlebars.registerHelper('json', function (array) {
        return JSON.stringify(array, "", 5);
    });

    Handlebars.registerHelper('table', function (array, values) {
        var string;
        for (var i = 0; i < array.length; i++) {

            string = '<li>' + values.fn(array[i]);

            if (values.fn(array[i]).length === 9) continue; //Хотел сделать пропуск пустых строк, но continue не срабатывает

        }
        return '<ul>' + string + '<li>'  + values.fn(array[i])  + '</li>'+ '</ul>';
    });


    var result = postsRowTemplate({posts: posts});
    $('.posts-json').html('<pre>' + result + '</pre>');

    var outHtml = (postsTableTemplate({posts: posts}));
    $('.posts-table').html(outHtml);

    $('ul').attr('type','none');
    $('li:nth-child(odd)').attr('style','background:grey; padding:10px 0 10px 0');
    $('li:nth-child(even)').attr('style','background:white; padding:10px 0 10px 0');

});
