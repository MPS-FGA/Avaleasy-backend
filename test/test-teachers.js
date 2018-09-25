const chai = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/base');

chai.use(require('chai-http'));

const app = require('../app.js');

describe('Api users', function describe() {
  this.timeout(10000); // How long to wait for a response

  before(() => {

  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection('teachers');
    done();
  });

  it('should add a SINGLE Teacher on /teachers/new POST', (done) => {
    chai.request(app)
      .post('/teachers/new')
      .send({ name: 'Professor', email: 'Professor@unbmail.com', password: '123' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should return all teachers on /teachers/', (done) => {
    chai.request(app).get('/teachers')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});
