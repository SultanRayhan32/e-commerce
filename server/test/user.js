const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);


describe('user', function () {
    // it('register', function (done) {
    //     chai.request(app)
    //     .post('/user/register')
    //     .send({
    //         username : 'wanda',
    //         password : 'abc123',
    //         email : 'wanda2@mail.com'
    //     })
    //     .end((err, res) => {
    //         expect(res).to.have.a.status(201);
    //         // expect(res).to.have.a.status(201);
    //         // expect(res.body).to.have.property('username')
    //         // expect(res.body).to.have.property('password')
    //         // expect(res.body).to.have.property('email')
    //         done()
    //     })
    // });
    // it('login', function (done) {
    //     chai.request(app)
    //     .post('/user/login')
    //     .send({
    //         password : 'abc123',
    //         email : 'wanda@mail.com'
    //     })
    //     .end((err, res) => {
    //         expect(res).to.have.a.status(201);
    //         // expect(res.body).to.have.property('password')
    //         // expect(res.body).to.have.property('email')
    //         done()
    //     })
    // })
})
