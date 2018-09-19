const chai = require('chai');
const { expect } = require('chai');

chai.use(require('chai-http'));

const app = require('../app.js');

describe('Api users', function describe() {
  this.timeout(5000); // How long to wait for a response

  before(() => {

  });

  after(() => {

  });

  it('Return 201 on /teachers/', () => chai.request(app)
    .post('/teachers')
    .then((res) => {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
    }));
});
