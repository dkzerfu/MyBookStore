const router = require('express').Router()
const models = require('../models')

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/new', (req, res) => {
    res.render('user/new')
})

router.post('/', async (req, res) => {
    try{
            const user = await models.user.findOrCreate({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.redirect('/')
        // }
    }catch(err){
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    
        const user = await models.user.findOne({
            where: { email: req.body.email }
        })
        if(user.password === req.body.password){
            console.log(user.password)

            res.redirect('/book/view')
        }else{
            req.render('user/login')
        }
})

router.get('/signOut', (req, res) => {
    res.render('index')
})





router.get('/wishListBook', (req, res) => {
    res.render('user/wishListBook')
})



module.exports = router