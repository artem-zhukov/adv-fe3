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
            var rowClass = 'evenRow';
            var style = '';
            if (i % 2 !=0) {
                rowClass = 'oddRow';
            }
            string += '<li class="' + rowClass+ '" ' + style+ '>' + values.fn(array[i]) + '</li>'; });
        return string + '</ul>';
    });


    var result = postsRowTemplate({posts: posts});
    $('.posts-json').html('<pre>' + result + '</pre>');

    var outHtml = (postsTableTemplate({posts: posts}));
    $('.posts-table').html(outHtml);
    $('ul').attr('type','none');

});
