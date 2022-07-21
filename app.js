const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/schema');
const app = express();
app.get('/',(req,res,next)=>{
    res.send("Backend server running");
});
app.use('/graphql',graphqlHTTP({
    schema:{},
    rootValue: {},
    graphiql: true
}))
mongoose.connect('mongodb://localhost/Rev_db',{
    useNewUrlParser: true
}).then(()=>{
    app.listen(8000, ()=>{
        console.log("Backend Server running on port 8000");
    })
}).catch(err=>{
    console.log("Error Detected");
})