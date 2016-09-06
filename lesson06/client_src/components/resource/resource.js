module.exports = function Resource(options) {
    var elem = $('<div></div>');

    var model = options.model;

    model.subscribe(function() {
        render();
    });

    function render() {
        elem.html(App.templates['resource']({}));
        elem.find('.resource__name').html(model.getName());
        elem.find('.resource__val').html(model.getCount());
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
