const { AuthenticationError } = require("apollo-server")

const user = {
    _id: "1",
    name: "RonaldH",
    email: "hongcool919@gmail.com",
    picture: "https://media-exp1.licdn.com/dms/image/C5603AQExa0_azaOuYQ/profile-displayphoto-shrink_400_400/0?e=1609372800&v=beta&t=Dfdr-iP6Bt3Nm3oePTSp7uqeC3bjn97uUQhycp-fSmo"
};

const authenticated = next => (root, args, ctx, info) => {
    if (!ctx.currentUser){
        throw new AuthenticationError("You Must Be Logged In")
    }
    return next(root, args, ctx, info)
}

module.exports = {
    Query: {
        me: authenticated((root, args, ctx)=> ctx.currentUser)
    }
}