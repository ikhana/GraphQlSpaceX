const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema");
const cors = require('cors');

const app = express();
//Alllow Cross origin 
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> console.log(`The server has been started on ${PORT}`));