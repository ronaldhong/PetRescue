const User = require("../models/User");
const {OAuth2Client} = require("google-auth-library")
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findorCreateUser = token => {
    //verify auth Token.

    //check if user exist.
    //if user exist, return then
    //otherwise create new user in db
}