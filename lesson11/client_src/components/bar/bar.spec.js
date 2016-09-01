var Bar  = require('./bar.js');

describe('bar', function () {
   describe('render method', function () {
       beforeEach(function () {

           this.model = jasmine.createSpyObj('model', ['getCount', 'subscribe']);

           this.options={
               model: this.resource
           };
           this.bar = new Bar(this.options);
       });

       it('should be render', function () {
           expect(this.bar.render).toBeDefined;
       });

       it('getCount should be defined',function () {
           expect(this.bar.getCount).toBeDefined();
       });

       it('modelGetCount should be called', function () {
           expect(this.model.getCount).toHaveBeenCalled();
       });

       it('modelSubscribe should be called', function () {
           expect(this.model.subscribe).toHaveBeenCalled();
       });
   })
});

