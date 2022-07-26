const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

// const graphqlSchema = require('./graphql/schema/schema');
const usersSchema = require('./graphql/schema/users-schema');
const adminSchema = require('./graphql/schema/admins-schema');
// const graphqlResolver = require('./graphql/resolvers/resolvers');
const{ usersResolver, adminsResolver} = require('./graphql/resolvers/resolvers')
const app = express();
app.use(express.static(__dirname + '/graphql'));
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res,next)=>{
    res.send("Backend server running");
});
app.use('/admins',graphqlHTTP({
    schema: adminSchema,
    rootValue: adminsResolver,
    graphiql: true
}));
app.use('/users',graphqlHTTP({
    schema: usersSchema,
    rootValue: usersResolver,
    graphiql: true
}));
mongoose.connect('mongodb://localhost/Rev_db',{
    useNewUrlParser: true
})
.then(()=>{
    app.listen(8000, ()=>{
        console.log("Backend Server running on port 8000");
    })
}).catch(err=>{
    console.log("Error Detected");
})