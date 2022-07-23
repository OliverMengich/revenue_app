const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolver = require('./graphql/resolvers/resolvers');
const app = express();
app.use(express.static(__dirname + '/graphql'));
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res,next)=>{
    res.send("Backend server running");
});
app.use('/graphql',graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))
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