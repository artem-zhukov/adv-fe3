var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');


    var BASE_HATE = 30;
    /*    var userGoldResource = options.resources[0];*/
    var BASE_GOLD = options.resources[0].getCount();
    /*    var userCopperResource = options.resources[1];*/
    var BASE_COPPER = options.resources[1].getCount();
    /* var userSomeResource = options.resources[2];*/
    var BASE_SOME = options.resources[2].getCount();
    var res = options.resource;
    var hate = new Hate(BASE_HATE);

    /*
     var goldGiftResource = new Resource({name: 'Gold'});
     var cooperGiftResource = new Resource({name: 'Copper'});
     var someGiftResource = new Resource({name: 'Some'});*/


    var resources = options.resources.map(function (res) {
        return new Resource({name: res.getName()});
    });


    Model.subscribeAll(resources, function () {
        var godLoveCount = resources.reduce(function (acc, resources) {
            var count = resources.getCount();
            var name = resources.getName();

            acc += count;
            return acc;

        }, 0);
        hate.setCount(BASE_HATE - godLoveCount);
        console.log(godLoveCount);
        /*     hate.setCount(BASE_HATE - resources[2].getCount() * 1 - resources[1].getCount() * 2 - resources[0].getCount() * 3);
         this.resources[0].setCount(BASE_GOLD - resources[0].getCount());
         this.resources[1].setCount(BASE_COPPER - resources[1].getCount());
         this.resources[2].setCount(BASE_SOME - resources[2].getCount());*/
    });

    var godHateIndicator = new GodHateIndicator({
        hate: hate
    });


    var tunners = resources.map(function (tunnerModel) {
        return new GiftTunner({resources : tunnerModel})
    });

/*    var goldTunner = new GiftTunner({
        resource: resources[0]
    });

    var copperTunner = new GiftTunner({
        resource: resources[1]
    });

    var someTunner = new GiftTunner({
        resource: resources[2]
    });*/


    /*
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
     */


    function render() {
        elem.html(App.templates['god-gift-form']({}));
/*
        elem.find('.god-gift-form__gold-tunner').html(goldTunner.render().elem);
        elem.find('.god-gift-form__copper-tunner').html(copperTunner.render().elem);
        elem.find('.god-gift-form__some-tunner').html(someTunner.render().elem);*/

        elem.find('.god-gift-form__tunners').html(tunners.map(function(tunner) {
            return tunner.render().elem;
        }));

        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function () {
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ', some:' + someTunner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};


