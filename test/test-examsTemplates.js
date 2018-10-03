const chai = require('chai');
const { expect } = require('chai');
const mongoose = require('mongoose');


mongoose.connect('mongodb://db:27017/test');

chai.use(require('chai-http'));

const app = require('../app.js');

describe('Api users', function describe() {
  this.timeout(10000); // How long to wait for a response

  before(() => {

  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase();
    done();
  });

  it('should add a SINGLE exam template on /examsTemplates/new POST', (done) => {
    chai.request(app)
      .post('/examsTemplates/new')
      .send({
        title: 'Modelo de avaliacao Objetiva',
        value: 100,
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
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});
