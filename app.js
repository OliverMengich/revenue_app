const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv/config')
//define the users schema
const usersSchema = require('./graphql/schema/users-schema');
const adminsSchema = require('./graphql/schema/admins-schema');
// add the resolvers 
const{ usersResolver, adminsResolver} = require('./graphql/resolvers/resolvers');
const userIsAuth = require('./middleware/user-is-auth');
const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*") //only the localhost is whitelisted to access our API
    res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS")// methods that can be passed to our API
    res.setHeader("Access-Control-Allow-Headers",'Content-Type, Authorization')
    if(req.method=="OPTIONS"){
        return res.sendStatus(200)
    }
    next();
});
app.use(userIsAuth);
app.use(express.static(__dirname + '/graphql'));
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res,next)=>{
    res.send("Backend server running");
});
app.use('/admins',graphqlHTTP({
    schema: adminsSchema,
    rootValue: adminsResolver,
    graphiql: true
}));
app.use('/users',graphqlHTTP({
    schema: usersSchema,
    rootValue: usersResolver,
    graphiql: true
}));
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
})
.then(()=>{
    app.listen(8000, ()=>{
        console.log("Backend Server running on port 8000");
    })
}).catch(err=>{
    console.log("Error Detected");
})