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

        var string = '<ul>';

        array.forEach(function(elem, i) {
            var rowClass = '';
            var style = '';
            if (i % 2) {
                rowClass = 'class = evenRow;';
                style = 'style = background:white;padding-top:10px;padding-bottom:10px';

            } else {
                rowClass = 'class = oddRow';
                style = 'style = background:grey;padding-top:10px;padding-bottom:10px';
            }

            string += '<li  ' + rowClass+ " " + style+ '>' + values.fn(array[i]) + '</li>'; });
        return string + '</ul>';
    });


    var result = postsRowTemplate({posts: posts});
    $('.posts-json').html('<pre>' + result + '</pre>');

    var outHtml = (postsTableTemplate({posts: posts}));
    $('.posts-table').html(outHtml);
    $('ul').attr('type','none');

});
