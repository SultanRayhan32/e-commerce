const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
'use strict'
require('dotenv').config()

const { Storage } = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}
const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next()
    }

    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
            next()
        })
    })

    stream.end(req.file.buffer)
}

const Multer = require('multer'),
    multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
})

module.exports = {
    HashingPassword: (password) => {
        console.log(password, ' di helpers')
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    },
    ComparePassword: (passwordDiDb, passwordInput) => {
        console.log(passwordDiDb, passwordInput, ' ini di helpers =<><><><><>')
        return bcrypt.compareSync(passwordInput, passwordDiDb);
    },
    Token: (data) => {
        console.log(data, '=======<><>')
        console.log('process.env.SECRET')
        return jwt.sign({
            data
        }, 'process.env.SECRET')
    },
    TokenVerify: (token) => {
        return jwt.verify(token, 'process.env.SECRET')
    },
    getPublicUrl,
    sendUploadToGCS,
    multer 
}