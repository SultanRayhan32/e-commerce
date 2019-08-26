const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);


describe('cart', function () {
    it('getCart', function (done) {
        chai.request(app)
        .get('/cart')
        .end((err, res) => {
            expect(res).to.have.a.status(200);
            // expect(res).to.have.a.status(201);
            // expect(res.body).to.have.property('username')
            // expect(res.body).to.have.property('password')
            // expect(res.body).to.have.property('email')
            done()
        })
    });
    it('addCart', function (done) {
        chai.request(app)
        .post('/user/login')
        .send({
            password : 'abc123',
            email : 'wanda@mail.com'
        })
        .end((err, res) => {
            expect(res).to.have.a.status(201);
            // expect(res.body).to.have.property('password')
            // expect(res.body).to.have.property('email')
            done()
        })
    })
})
