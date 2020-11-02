const {ApolloServer} = require("apollo-server")
require("dotenv").config()

const {findorCreateUser} = require("./controllers/userController")
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(()=>console.log("DB CONNECTED"))
.catch((error)=>console.log(error))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>{
        console.log(req)
        let authToken = null;
        try {
            authToken = req.headers.authorization
            if (authToken){
                //Find or Create User
                findorCreateUser(authToken)
            }
        }catch (error){
            console.log("error, arn't able to authorize token ")
        }
    }
})

server.listen().then(({url})=>{
    console.log(`Server Listening on port ${url}`);
});