$( document ).ready( function () {
    var posts = Data.getPosts();

    var selectedPage = 0;
    var perPage = 13;
    var template = Handlebars.compile('post description - {{post.description}}');

    var html = template({
        post: Data.getPost()
    });

    $('.posts-container__list').html(html);

    console.log(html);



    var source = $(".posts-json").html();
  /*  var template = Handlebars.compile(source);*/


    Handlebars.registerHelper('json', function () {
        console.log('JSON ');
        return '';
    });

    var html = template(posts.description)

    $('.posts-json').html(html);


    /*    render();
        subscribeHandlers();*/

    function render() {
        renderPosts();
        renderNavigation();
    }

    function subscribeHandlers() {
        $( '.posts-container__navigation' ).click( function( event ) {
            var selected = parseInt( event.target.textContent ) - 1;
            //var selected = parseInt($(event.target).data('id')) - 1;

            if ( selected === selectedPage ) {
                return;
            }
            selectedPage = selected;
            renderPosts();
            renderNavigation();
            $( 'html,body' ).animate( { scrollTop : 0 }, 0 );
        });

        $( '.posts-container__post' ).click( function () {
            console.log( 'selected post' );
        } );
    }

    function renderNavigation() {
        var count = Math.ceil( posts.length / perPage );
        var numbContainer = $('<div></div>' ).addClass( '.posts-container__navigation-numbers' );

        for ( var i = 0; i < count; i ++ ) {
            var numberElement = $( '<div>' + ( i + 1 ) + '</div>' );
            numberElement.addClass( 'posts-container__navigation-number' );
            if ( i === selectedPage ) {
                numberElement.addClass( 'posts-container__navigation-number_selected' );
            }
            numbContainer.append( numberElement );
        }
        $( '.posts-container__navigation' ).html( numbContainer.html() );
    }

    function renderPosts() {
        var postsForRender = posts.slice( selectedPage * perPage, selectedPage * perPage + perPage );
        var container = $( '<div></div>' );

        container.append( postsForRender.map( function ( post ) {
            var postElem = $( '<div></div>' ).addClass( 'posts-container__post' );
            var postIsland = $( '<div></div>' ).addClass( 'posts-container__post-island' );

            postIsland.append( '<div class="posts-container__post-img-wrapper"><img class=posts-container__post-img src="' + post.imgUrl + '"></img></div>' );
            postIsland.append( '<div class="posts-container__post-description">' + post.description + '</div>' );
            postElem.append( postIsland );

            return postElem;
        } ) );
        $( '.posts-container__list' ).html( container.html() );
    }
});

