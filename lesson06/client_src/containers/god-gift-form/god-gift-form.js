var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 30;
    var hate = new Hate(BASE_HATE);

    var resources = options.resources.map(function (res) {
        var resModel = new Resource({name: res.getName()});
        var count = res.getCount();

        resModel.subscribe(function() {
            res.setCount(count - resModel.getCount());
        });
        return resModel;
    });

    Model.subscribeAll(resources, function () {
        var godCount = resources.reduce(function (acc, resources) {
            return acc + resources.getCount()
        }, 0);
        hate.setCount(BASE_HATE - godCount);
    });

    var godHateIndicator = new GodHateIndicator({
        hate: hate
    });

    var tunners = resources.map(function (tunnerModel) {
        return new GiftTunner({resource: tunnerModel})
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__tunners').html(tunners.map(function (tunner) {
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
