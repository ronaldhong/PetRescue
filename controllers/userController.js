const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findOrCreateUser = async token => {
    //verify auth Token.
    const googleUser = await verifyAuthToken(token)
    const user = await checkIfUserExists(googleUser.email)
    console.log("user###",user)
    //check if user exist.
    //if user exist, return then, otherwise create new user in db
    return user ? user : createNewUser(googleUser)

}

const verifyAuthToken = async token => {
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        })
        return ticket.getPayload()
    }catch(err){
        console.log(err)
    }
}
const checkIfUserExists = async email => await User.findOne({ email }).exec()


const createNewUser = googleUser => {
    const {name, email, picture } = googleUser
    const user = {name, email, picture}
    console.log("new user", user)
    return new User(user).save()
}