const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
app.use(cors());
mongoose.connect("mongodb+srv://Inaam:fffggg444@cluster0.dhhzi.mongodb.net/Inaamreadinglist?retryWrites=true&w=majority");

mongoose.connection.once('open',()=>{
  console.log('you are connected')
})


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
    
  })
);

app.use(express.static('public'));
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));