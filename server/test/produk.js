const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app')

chai.use(chaiHttp);


describe('product', function () {
    describe('get', () => {
        it('Get All Product ', (done) => {
            chai.request(app)
            .get('/product')
            .end((err, res) => {
                expect(res).to.have.a.status(200);
                done()
            })
        });
        it('Add New Product' , (done)=>{
            chai.request(app)
            .post('/product')
            .send({
                name : 'lsdkf',
                price : 5000,
                stock : 10,
                image : '',
                price : ''
            })
            .end((err, res) => {
                expect(res).to.have.a.status(201);
                expect(res.body).to.have.property('name').with.equal('lsdkf')
                done()
            })
        });
        it('Edit Product' , (done)=>{
            chai.request(app)
            .put('/product/5d5a59dfc475903e88165ff1')
            .send({
                name : 'wkwkwkwkwk',
                price : 5000,
                stock : 10
            })
            .end((err, res) => {
                expect(res).to.have.a.status(200);
                // expect(res.body).to.have.property('name').with.equal('lsdkf')
                done()
            })
        });
        it('Delete Product' , (done)=>{
            chai.request(app)
            .delete('/product/5d5a59dfc475903e88165ff1')
            .end((err, res) => {
                expect(res).to.have.a.status(200);
                // expect(res.body).to.have.property('name').with.equal('lsdkf')
                done()
            })
        });
        it('get Product' , (done)=>{
            chai.request(app)
            .get('/product/5d60f9294ec321444bae42d2')
            .end((err, res) => {
                expect(res).to.have.a.status(200);
                done()
            })
        });
    })
})
