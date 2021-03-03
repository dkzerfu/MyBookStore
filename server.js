const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')

const rowdy = require('rowdy-logger')
require('dotenv').config()



const PORT = 3000
const rowdyResult = rowdy.begin(app)

app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.use('/user', require('./controller/usercontroller'))
app.use('/book', require('./controller/bookController'))


app.get('/', function(req, res){
    res.render('index')
})







app.listen(PORT, () => {
    console.log(`Server is Listening ${PORT}`)
    rowdyResult.print()
})

