const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    type User{
        _id: ID!
        name: String!
        email: String!
        password: String
        phoneNumber: String!
        IDNumber: Int!
        age: Int!
        role: String!
        dateOfBirth: String!
        imageUrl: String!
        transactionsId: [Transaction]
    }
    type Admin{
        _id: ID!
        name: String!
        email: String!
        phoneNumber: String!
        StaffID: Int!
        password: String!
        role: String!
    }
    type Transaction{
        _id: ID!
        to: User!
        amount: Float!
        createdAt: String!
        updatedAt: String!
        dueDate: String!
        bankIdVerification: String
    }
    input UserInput{
        name: String!
        email: String!
        phoneNumber: String!
        IDNumber: Int!
        age: Int!
        dateOfBirth: String!
        imageUrl: String!
        password: String!
    }
    input AdminInput{
        name: String!
        email: String!
        phoneNumber: String!
        StaffID: Int!
        password: String!
    }
    input TransactionsInput{
        to: ID!
        amount: Float!
        dueDate: String!
    }
    type AuthData{
        userId: ID!
        token: String
        tokenExpiration: Int!
    }
    type RootQuery{
        getusers: [User!]!
        getuser(userId: String!): User!
        getTransactions: [Transaction!]!
        getTransaction(transactionId: ID!): Transaction!
        login(IDNumber: Int!, password: String!): AuthData!
        adminlogin(StaffID: Int!, password: String!, role: String): AuthData
    }
    type RootMutation{
        createUser(userInput: UserInput): User!
        createTransaction(transaction: TransactionsInput): Transaction!
        makeTransaction(transactionId: ID!,bankIdVerification: String!): Transaction!
        createAdmin(adminInput: AdminInput): Admin!
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`)