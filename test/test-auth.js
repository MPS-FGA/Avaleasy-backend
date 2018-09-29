const chai = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


chai.use(require('chai-http'));

const app = require('../app.js');

describe('Auth api', function describe() {
  this.timeout(10000); // How long to wait for a response
  const testUser = {
    name: 'test',
    email: 'test@test.com',
    password: '123123',
  };
  
  const SECRET_KEY = '8517cede2b9ac904ba77e418e5a02b54f6b47567';
  
  before(() => {
    mongoose.connect('mongodb://db:27017/base');
    chai.request(app).post('/teachers/new').send(testUser);
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection('teachers');
    done();
  });

  it('should return a valid token', (done) => {
    chai.request(app)
      .post('/auth/sign-in')
      .send({ email: testUser.email, password: testUser.password })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have('token');
        expect(jwt.decode(res.token, SECRET_KEY)).to.be.true;
        done();
      });
  });
});
