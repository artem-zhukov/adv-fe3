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

    var arr = [userGoldResource,userCopperResource,userSomeResource];

    // create GodGiftForm 
    // {resources: resources}
    var godGiftForm = new GodGiftForm({
        model:arr
    })

    
    // create UserWealth 
    // {resources: resources}
    var userWealth = new UserWealth({
        model:arr
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
