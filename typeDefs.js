const {gql} = require("apollo-server")
module.exports = gql`
    type User{
        _id: ID
        name: String
        email: String
        picture: String

    }

    type Pin{
        _id: ID
        createdAt: String
        title: String
        content: String
        image: String
        lat: Float
        long: Float
        author: User
        comments: [Comment]
    }

    type Comment{
        createdAt:String
        text: String
        author: User
    }

    type Query{
        me: User

    }
`