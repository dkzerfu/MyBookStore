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
        const url = `https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=40&key=${key}`
        const requestSearch = await axios.get(url)
        let result = requestSearch.data
        
        res.render('book/view.ejs', {result: result})

    }catch(err){
        console.log(err)
    }
} )

router.post('/' , async (req, res) => {
    try{
        const book = await models.book.create({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            userId: res.locals.user.id,
            img_url: req.body.img_url
        })
        res.redirect(`/user/${res.locals.user.id}/wishListBook`)
    }catch(err){
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const book = await models.book.destroy({
            where: { id: req.params.id}
        })
        console.log( req.params.id, '🪰')

        res.redirect(`/user/${res.locals.user.id}/wishListBook`)
    }catch(err){
        console.log(err)
    }
})


module.exports = router