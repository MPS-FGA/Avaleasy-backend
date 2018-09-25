const chai = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://db:27017/base');

chai.use(require('chai-http'));

const app = require('../app.js');

describe('Auth api', function describe() {
  this.timeout(10000); // How long to wait for a response
  const test_user = {
    name: 'test',
    email: 'test@test.com',
    password: '123123'
  }
  
  before(() => {
    chai.request(app).post('/teachers/new').send(test_user);
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection('teachers');
    done();
  });

  it('should return a valid token', (done) => {
    chai.request(app)
      .post('/auth/sign-in')
      .send({ email: test_user.email, password: test_user.password })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have("token");
        expect(jwt.decode(res.token, 'secretkey')).to.be.true;
        // done();
      });
  });
});
