const chai = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');

const Teacher = require('../models/teacher.js');

mongoose.connect('mongodb://db:27017/test');

chai.use(require('chai-http'));

const app = require('../app.js');

const newTeacherUrl = '/teachers/new';
const teachersUrl = '/teachers';

describe('Teachers GET', function describe() {
  this.timeout(1000000000); // How long to wait for a response

  afterEach((done) => {
    mongoose.connection.db.dropDatabase();
    done();
  });


  it('Should return a list of teachers on /teachers/', (done) => {
    // Create a teacher on test DB
    const data = { name: 'bla', password: '123', email: 'bla@email' };
    const teacher = new Teacher(data);
    teacher.save();

    chai.request(app)
      .get(teachersUrl)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.eql(
          { _id: teacher.id, name: teacher.name, email: teacher.email },
        );
        done();
      });
  });

  it('Should return a single teacher on /teachers/:id', (done) => {
    // Create a teacher on test DB
    const data = { name: 'bla', password: '123', email: 'bla@email' };
    const teacher = new Teacher(data);
    teacher.save();

    const url = `/teachers/${teacher.id}`;

    chai.request(app)
      .get(url)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.eql(
          { _id: teacher.id, name: teacher.name, email: teacher.email },
        );
        done();
      });
  });

  it('Should return 404 for invalid teacher id on /teacher/:id', (done) => {
    const url = '/teachers/123';
    chai.request(app)
      .get(url)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});


describe('Teachers POST', function describe() {
  this.timeout(1000000000); // How long to wait for a response

  afterEach((done) => {
    mongoose.connection.db.dropDatabase();
    done();
  });

  it('should add a SINGLE Teacher on /teachers/new POST', (done) => {
    chai.request(app)
      .post(newTeacherUrl)
      .send({ name: 'Professor', email: 'Professor@unbmail.com', password: '123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('Should return 400 for invalid info when POST on /teachers/new', (done) => {
    chai.request(app)
      .post(newTeacherUrl)
      .send({ name: '', password: '', email: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Teachers DELETE', function describe() {
  this.timeout(1000000000); // How long to wait for a response

  afterEach((done) => {
    mongoose.connection.db.dropDatabase();
    done();
  });

  it('Should delete a teacher calling http DELETE on /teacher/:id', (done) => {
    const data = { name: 'bla', password: '123', email: 'bla@email' };
    const teacher = new Teacher(data);
    teacher.save();

    const url = `/teachers/${teacher.id}`;

    chai.request(app)
      .delete(url)
      .end((err, res) => {
        let t;
        Teacher.findOne({ _id: teacher.id }, (er, th) => {
          t = th;
        });
        expect(res).to.have.status(204);
        expect(t).to.be.eql(undefined);
        done();
      });
  });


  it('Should return 404 for invalid teacher id when DELETE on /teacher/:id', (done) => {
    const url = '/teachers/123';

    chai.request(app)
      .delete(url)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should edit a Teacher on /teachers/edit/id', (done) => {
    const data = { name: 'bla', password: '123', email: 'bla@email' };
    const teacher = new Teacher(data);
    teacher.save();
    this.timeout(1000000000);
    const url = `/teachers/edit/${teacher.id}`;

    chai.request(app)
      .put(url)
      .send({ name: 'Teach', password: '321' })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
      });
  });
});
