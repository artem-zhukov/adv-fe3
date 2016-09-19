var Resource = require('components/resource/resource.js')

module.exports = function Game() {

    var elem = $('<div></div>');

    var goldResource = new Resource({
        name:'Gold: ',
        count: 20
    });

    var copperResource = new Resource({
        name:'copper: ',
        count: 30
    });

    var someResource = new Resource({
        name:'some: ',
        count: 30
    });

    function render() {

        elem.html(App.templates['user-wealth']({}));
        elem.find('.resource__gold').html(goldResource.render().elem);
        elem.find('.resource__copper').html(copperResource.render().elem);
        elem.find('.resource__some').html(someResource.render().elem);
        return this;
    }


    return {
        render: render,
        elem: elem
    }
};
