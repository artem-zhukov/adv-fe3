module.exports = function Resource (options) {
    var elem = $('<div></div>');

    function render() {
        elem.html(App.templates['resource']({}));
        elem.find('.resource__name').html(options.name);
        elem.find('.resource__value').html(options.count);
        return this;
    }

    return {
        render: render,
        elem: elem
    }

}

