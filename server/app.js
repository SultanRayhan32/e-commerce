const express = require('express');
const port = 3000;
const mongoose = require('mongoose')
const app = express();

const routes = require('./routes');
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ useNewUrlParser: true }))

app.use('/', routes)


app.get('/', (req, res) => {
    res.json({
        mes: 'sukses terkirim wkwkwkwk'
    })
})


// mongoose.connect('mongodb+srv://SultanRH32:nasipadang123@cluster0-jw2ud.mongodb.net/myDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {

// })
mongoose.connect('mongodb://SultanRH32:nasipadang123@cluster0-shard-00-00-jw2ud.mongodb.net:27017,cluster0-shard-00-01-jw2ud.mongodb.net:27017,cluster0-shard-00-02-jw2ud.mongodb.net:27017/myDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }, () => {

})
.then(data => {
    console.log('sukses')
})
.catch(err => {
    console.log(err, ' ========')
})

app.listen(port, () => console.log('jalan di ' + port))

module.exports = app