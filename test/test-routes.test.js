let chai = require('chai');
const serverUrl = 'http://localhost:8000';
chai.config.includeStack = true;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = require('request');
var assert = require('chai').assert;
let should = chai.should();
const { expect } = require('chai');

//Add Test
describe('For Add to Blockchain  API', () => {
  it('Should return Could not get expected keyvalues in the JSON Request Payload ', function (done) {
    chai
      .request(serverUrl)
      .post('/add')
      .send({})
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.be.equal(
          'Could not get expected keyvalues in the JSON Request Payload'
        );
        done();
      });
  });
  it('Should  return Success message with timestamp and blocknumber', function (done) {
    chai
      .request(serverUrl)
      .post('/add')
      .send({
        string: 'Mat',
      })
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.status.should.be.equal('Success');
        done();
      });
  });
  it('Should  return hash alredy exist', function (done) {
    chai
      .request(serverUrl)
      .post('/add')
      .send({
        string: 'Alen',
      })
      .end((err, res) => {
        console.log(res.body);
        res.status.should.be.equal(400);
        res.body.status.should.be.equal('Failure');
        res.body.error.should.be.equal(
          'hash already exists,try something else'
        );
        done();
      });
  });
});

//Verify Test
describe('For Verify if values exist in Blockchain API', () => {
  it('Should Could not get expected keyvalues in the JSON Request Payload ', function (done) {
    chai
      .request(serverUrl)
      .get('/verify/?')
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.be.equal(
          'Could not get expected keyvalues in the JSON Request Payload'
        );
        done();
      });
  });
  it('Should return status, blockchain number and timestamp ', function (done) {
    chai
      .request(serverUrl)
      .get('/verify/?string=Alen')
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.status.should.be.equal('Success');
        res.body.timestamp.should.be.equal('1589777117');
        res.body.blocknumber.should.be.equal('5');
        done();
      });
  });
});
