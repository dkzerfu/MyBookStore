const models = require('./models')
const axios = require('axios')
// createBook = async () => {
//     try{
//         const user = await models.user.findOne({
//             where: {id: 2}
//         })
      
//         const newBook = await models.book.create({
//             title: ' the day today',
//             author: 'dergem',
//             description: ' project week',
//             price: 23,
//             userId: user.id
//         })
//     }catch(err){
//         console.log(err)
//     }
// }
// createBook()

// createUser = async () => {
//     try{
//         const newUser = await models.user.create({
//             name: 'Dagm',
//             email: 'dkzerfu@gmail.com',
//             password: 'hello'
//         })
//     }catch(err){
//         console.log(err)
//     }
// }
//createUser()
//createBook()
let results = []

async function bookStore(){
    const url = `https://www.googleapis.com/books/v1/volumes?q=python&key=${key}`
    const requestSearch = await axios.get(url)
    const result = requestSearch.data

    for(let i = 0; i < result.items.length; i++){
        let items = result.items[i]
        let title = items.volumeInfo.title
        let description = items.volumeInfo.description
        let price = items.volumeInfo.infoLink
        results.push('price')
        console.log(price)
        return(items)
    }
}
// var nietos = [];
// var obj = {};
// obj["01"] = nieto.label;
// obj["02"] = nieto.value;
// nietos.push(obj);
console.log(results)
bookStore()