const express = require('express');
const router = express.Router();
const { product_controller } = require('../controllers')
const upload = require('../helpers')

router.get('/' ,  product_controller.getProduct )
router.post('/' ,  upload.multer.single('image'), upload.sendUploadToGCS,    product_controller.addProduct )
router.put('/:id' ,  product_controller.editProduct )
router.delete('/:id' ,  product_controller.deleteProduct )
router.get('/:id' , product_controller.getOneProduct)

module.exports = router;