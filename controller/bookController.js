const router = require('express').Router()
const models = require('../models')
const axios = require('axios')
const { get } = require('./usercontroller')
const cryptoJs = require('crypto-js')
require('dotenv').config()


const key = process.env.ENV_VARIABLE

router.get('/view' , (req, res) => {
    res.render('book/view')
})
router.get('/search', async (req, res) => {
    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&key=${key}`
        const requestSearch = await axios.get(url)
        let result = requestSearch.data
        
        res.render('book/view.ejs', {result: result})

    }catch(err){
        console.log(err)
    }
} )

router.post('/' , async (req, res) => {
    try{
        const decryptedId = cryptoJs.AES.decrypt(req.cookies.userId, 'super secret string')
        const decryptedIdString = decryptedId.toString(cryptoJs.enc.Utf8)
        
        const user = await models.user.findByPk(decryptedIdString)
        
        console.log(user.id)
        const book = await models.book.create({
            title: req.body.title,
            author: req.body.author,
            //description: req.body.description,
            //price: req.body.price,
            userId: user.id,
            img_url: req.body.img_url
        })
        res.redirect('/user/:id/wishListBook')
    }catch(err){
        console.log(err)
    }
})


module.exports = router