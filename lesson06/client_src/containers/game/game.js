var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    var goldResourceModel = new Resource({
        count: 10,
        name: 'gold'
    });

    var copperResourceModel = new Resource({
        count: 20,
        name: 'copper'
    });

    var someResourceModel = new Resource({
        count: 30,
        name: 'some'
    });

    var resources = [goldResourceModel, copperResourceModel, someResourceModel];

    var giftForm = new GodGiftForm({
        resources: resources
    });

    var userWealth = new UserWealth({
        resources: resources
    });

    function render() {
        elem.html(App.templates['game']({}));
        elem.find('.game__god-gift-form').html(giftForm.render().elem);
        elem.find('.game__wealth').html(userWealth.render().elem);
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};

