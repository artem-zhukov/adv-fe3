var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');


    var BASE_HATE = 30;
    var userGoldResource = options.resources[0];
    var BASE_GOLD = options.resources[0].getCount();
    var userCopperResource = options.resources[1];
    var BASE_COPPER = options.resources[1].getCount();
    var userSomeResource = options.resources[2];
    var BASE_SOME = options.resources[2].getCount();

    var hate = new Hate(BASE_HATE);
    var goldGiftResource = new Resource({name: 'Gold'});
    var cooperGiftResource = new Resource({name: 'Copper'});
    var someGiftResource = new Resource({name: 'Some'});

    Model.subscribeAll([goldGiftResource, cooperGiftResource, someGiftResource], function() {
        hate.setCount(BASE_HATE - someGiftResource.getCount() * 1 - cooperGiftResource.getCount() * 2  - goldGiftResource.getCount() * 3);
        userGoldResource.setCount(BASE_GOLD - goldGiftResource.getCount());
        userCopperResource.setCount(BASE_COPPER - cooperGiftResource.getCount());
        userSomeResource.setCount(BASE_SOME - someGiftResource.getCount());
    });

    var godHateIndicator = new GodHateIndicator({
        hate: hate
    });

    var goldTunner = new GiftTunner({
        resource: goldGiftResource
    });

    var copperTunner = new GiftTunner({
        resource: cooperGiftResource
    });

    var someTunner = new GiftTunner({
        resource: someGiftResource
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__gold-tunner').html(goldTunner.render().elem);
        elem.find('.god-gift-form__copper-tunner').html(copperTunner.render().elem);
        elem.find('.god-gift-form__some-tunner').html(someTunner.render().elem);
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ', some:' + someTunner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};


