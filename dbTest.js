const models = require('./models')

createBook = async () => {
    try{
        const newBook = await models.book.create({
            title: 'what is the day today',
            author: 'Dagm',
            description: 'this week is project week',
            price: 23

        })
    }catch(err){
        console.log(err)
    }
}
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
