const router = require('express').Router()
const models = require('../models')
const axios = require('axios')
require('dotenv').config()

const key = process.env.ENV_VARIABLE

router.get('/view' , (req, res) => {
    res.render('book/view')
})
router.get('/search', async (req, res) => {
    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=javascript&key=${key}`
        const requestSearch = await axios.get(url)
        const result = requestSearch.data

        res.render('book/view', {result: result})

    }catch(err){
        console.log(err)
    }
} )


module.exports = router