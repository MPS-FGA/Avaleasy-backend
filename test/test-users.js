const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js');

describe('Api users', function() {
  this.timeout(5000); // How long to wait for a response 

  before(function() {

  });

  after(function() {

  });

  it('Return 200 on root /', () => {
    return chai.request(app)
      .post('/users')
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
      });
  });

})

