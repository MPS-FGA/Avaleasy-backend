const chai = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');
const Teacher = require('../models/teacher.js');

mongoose.connect('mongodb://db:27017/base');

chai.use(require('chai-http'));

const app = require('../app.js');

describe('Auth api', function describe() {
  this.timeout(10000); // How long to wait for a response
  const data = {
    name: 'test',
    email: 'test@test.com',
    password: '123123a',
  };

  before(() => {
    mongoose.connect('mongodb://db:27017/base');
  });

  afterEach((done) => {
    done();
  });

  it('should sign in valid user', (done) => {
    const teacher = new Teacher(data);
    teacher.save();

    chai.request(app)
      .post('/auth/sign-in')
      .send({ email: teacher.email, password: teacher.password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('Should return 404 for invalid info', (done) => {
    chai.request(app)
      .post('/auth/sing-in')
      .send({ email: '', password: '' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
