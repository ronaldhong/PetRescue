const user = {
    _id: "1",
    name: "RonaldH",
    email: "hong_ronald@hotmail.com",
    picture: "https://media-exp1.licdn.com/dms/image/C5603AQExa0_azaOuYQ/profile-displayphoto-shrink_400_400/0?e=1609372800&v=beta&t=Dfdr-iP6Bt3Nm3oePTSp7uqeC3bjn97uUQhycp-fSmo"
}

module.exports = {
    Query: {
        host: () => user
    }
}