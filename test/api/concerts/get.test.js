const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  it('/should return concerts of selected performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/should return concerts of selected genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/should return concerts of selected price', async () => {
    const res = await request(server).get('/api/concerts/price/30/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/should return concerts of selected day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });
});
