const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    type User{
        _id: ID!
        name: String!
        email: String!
        password: String!
        phoneNumber: String!
        IDNumber: Int!
        age: Int!
        role: String!
        dateOfBirth: String!
        imageUrl: String!
        transactions: Transaction
    }
    type Admin{
        _id: ID!
        name: String!
        email: String!
        phoneNumber: String!
        StaffID: Int!
        role: String!
    }
    type Transaction{
        _id: ID!
        to: ID!
        amount: Float!
        createdAt: String!
        updatedAt: String!
        dueDate: String!
        transactionId: String!
    }
    input UserInput{
        name: String!
        email: String!
        phoneNumber: String!
        IDNumber: Int!
        age: Int!
        dateOfBirth: String!
        imageUrl: String!
    }
    input AdminInput{
        role: String!
        StaffID: Int!
        password: String
    }
    input TransactionsInput{
        to: ID!
        amount: Float!
        createdAt: String!
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
        getTransaction(transactionId: String!): Transaction!
        login(IDNumber: Int!, password: String!): AuthData!
        adminlogin(StaffID: Int!, password: String!, role: String): AuthData
    }
    type RootMutation{
        createUser(userInput: UserInput): User!
        createTransaction(transaction: TransactionsInput): Transaction!
        makeTransaction(transactionId: ID!): Transaction!
        createAdmin(adminInput: AdminInput): Admin!
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`)