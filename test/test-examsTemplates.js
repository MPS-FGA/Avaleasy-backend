const chai = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');

const ExamsTemplates = require('../models/examTemplate.js');

mongoose.connect('mongodb://db:27017/test');

chai.use(require('chai-http'));

const app = require('../app.js');

const examMockData = {
  title: 'Modelo de avaliacao Objetiva',
  value: 100,
  teacherId: 1,
  tblQuestions: [],
  objectiveQuestions: [
    {
      title: 'Questao objetiva',
      punctuation: 2,
    },
    {
      title: 'Outra Questao objetiva',
      punctuation: 3,
    },
  ],
  multipleChoiceQuestions: [],
  tfQuestions: [],
};

describe('Exams Templates POST tests', function describe() {
  this.timeout(1000000000); // How long to wait for a response

  before(() => {

  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase();
    done();
  });

  it('should add a SINGLE exam template on /examsTemplates/new POST', (done) => {
    chai.request(app)
      .post('/examsTemplates/new')
      .send(examMockData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('Should return 400 for invalid data when POST on /examsTemplates/new', (done) => {
    chai.request(app)
      .post('/examsTemplates/new')
      .send({ title: '', value: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Exams Templates GET tests', function describe() {
  this.timeout(1000000000); // How long to wait for a response

  before(() => {

  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase();
    done();
  });

  it('Should return a list of exams templates on /examsTemplates/', (done) => {
    const examTemplate = new ExamsTemplates(examMockData);
    examTemplate.save();

    chai.request(app)
      .get('/examsTemplates/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].title).to.equal('Modelo de avaliacao Objetiva');

        done();
      });
  });

  it('Should return a single exam template on /examsTemplates/:id', (done) => {
    const examTemplate = new ExamsTemplates(examMockData);
    examTemplate.save();

    const url = `/examsTemplates/${examTemplate.id}`;

    chai.request(app)
      .get(url)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');

        done();
      });
  });

  it('Should not return a exam template on /examsTemplates/:id with invalid id', (done) => {
    const examTemplate = new ExamsTemplates(examMockData);
    examTemplate.save();

    const url = '/examTemplate/4';

    chai.request(app)
      .get(url)
      .end((err, res) => {
        expect(res).to.have.status(404);

        done();
      });
  });
});
