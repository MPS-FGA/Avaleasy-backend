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

  // list teachers
  it('Return 200 on /teachers/', () => {
    return chai.request(app)
      .get('/teachers')
      .then((res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
      });
  });

  // create teacher
  it('Return 201 on /teachers/new', () => {
    return chai.request(app)
      .post('/teachers/new?name="admin"&email="admin@admin.com"&password="admin"')
      .then((res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(201);
      });
  });

})

