var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    // create resources 
    // e.g {count: 10, name: gold}
    var userGoldResource = new Resource({
        name: "gold",
        count: 10
    });

    var userCopperResource = new Resource({
        name: "copper",
        count: 20
    });

    var userSomeResource = new Resource({
        name: "some",
        count: 30
    });

    // create GodGiftForm 
    // {resources: resources}
    var godGiftForm = new GodGiftForm({
        gold: userGoldResource,
        copper: userCopperResource,
        some: userSomeResource
    })

    
    // create UserWealth 
    // {resources: resources}
    var userWealth = new UserWealth({
        gold: userGoldResource,
        copper: userCopperResource,
        some: userSomeResource
    })

    function render() {
        elem.html(App.templates['game']({}));
         elem.find('.game__god-gift-form').html(godGiftForm.render().elem)
         elem.find('.game__wealth').html(userWealth.render().elem)
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
