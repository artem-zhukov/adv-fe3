var Bar  = require('./bar.js');
var Resource  = require('../../models/resource.js');

describe('bar', function () {
   describe('render method', function () {
       beforeEach(function () {
            this.resource = new Resource({
               count: 2
           });

           this.options={
               model: this.resource
           };
           this.bar = new Bar(this.options);
       });

       it('should be render', function () {
           expect(this.bar.render).toBeDefined;
       })
   })
});

