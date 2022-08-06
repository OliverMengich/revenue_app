const { buildSchema, GraphQLObjectType } = require('graphql');
module.exports = buildSchema(`
    type User{
        _id: ID!
        surname: String!
        othernames: String!
        email: String!
        password: String
        phoneNumber: String!
        IDNumber: Int!
        age: Int!
        role: String
        dateOfBirth: String!
        imageUrl: String!
        transactionsId: [Transaction]
    }
    type Transaction{
        _id: ID!
        to: User!
        amount: Float!
        createdAt: String!
        updatedAt: String!
        dueDate: String!
        bankIdVerification: String
        paid: Boolean
    }
    input UserInput{
        surname: String!
        othernames: String!
        email: String!
        phoneNumber: String!
        IDNumber: Int!
        age: Int!
        dateOfBirth: String!
        imageUrl: String!
        password: String!
    }
    type AuthData{
        userId: ID!
        usertoken: String
        tokenExpiration: Int!
    }
    type Verification{
        message: String
        randomNumber: Int
        phoneNumber: String
    }
    type RootQuery{
        login(IDNumber: Int!, password: String!): AuthData!
        getuserTransactions(userId: ID!): [Transaction!]!
        verifyPhoneNumber(phoneNumber: String!): Verification
    }
    type RootMutation{
        createUser(userInput: UserInput): User!
        makeTransaction(transactionId: ID!,bankIdVerification: String!): Transaction!
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`)