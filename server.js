const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const cryptoJs = require('crypto-js')
const rowdy = require('rowdy-logger')
require('dotenv').config()
const models = require('./models')


const PORT = 3000
const rowdyResult = rowdy.begin(app)

app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(cookieParser())


app.use(async (req, res, next) => {
    if(req.cookies.userId){

        const decryptedId = cryptoJs.AES.decrypt(req.cookies.userId, 'super secret string')
        const decryptedIdString = decryptedId.toString(cryptoJs.enc.Utf8)
        
        const user = await models.user.findByPk(decryptedIdString)
        
      res.locals.user = user
    }else{
        res.locals.user = null
    }
    
    next()
    
})



app.get('/', function(req, res){
    res.render('index')
})


app.use('/user', require('./controller/usercontroller'))
app.use('/book', require('./controller/bookController'))




app.listen(PORT, () => {
    console.log(`Server is Listening ${PORT}`)
    rowdyResult.print()
})

