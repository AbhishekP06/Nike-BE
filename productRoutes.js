const express = require('express')
const router = express.Router();

const Product = require('./models/shoeModel')

router.get('/', async(req, res) => {
    try{
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.post('/', async(req, res) => {
    try{
        const {name, type, image, colors, price, img} = req.body;
        const newProduct = new Product({ name, type, image, colors, price, img});
        await newProduct.save();
        res.status(200).json({
            success: true,
            product: newProduct
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;