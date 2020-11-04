const {ApolloServer} = require("apollo-server")
const mongoose = require("mongoose")
require("dotenv").config()
const {findOrCreateUser} = require("./controllers/userController")
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("DB CONNECTED"))
.catch((error)=>console.log("DB NOT CONNECTED"))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req })=>{
        let authToken = null;
        let currentUser = null;
        try {
            authToken = req.headers.authorization
            if (authToken){
                console.log("authToken", authToken)
                //Find or Create User
               currentUser = await findOrCreateUser(authToken)
            }
        }catch (error){
            console.error(`error, arn't able to authorize token ${authToken}!!!!!! `)
        }
        return {currentUser}
    }
})

server.listen().then(({url})=>{
    console.log(`Server Listening on port ${url}`);
});