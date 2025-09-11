const express = require('express')
const router = express.Router();

const Shoe = require('./models/spotlightModel')

router.get('/', async(req, res) => {
    try{
        const shoe = await Shoe.find();
        res.status(200).json(shoe);
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})



module.exports = router;