import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { AddBook } from './components/AddBook';
const { BookList } = require("./components/BookList");







const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});



function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Inaam Reading List</h1>
    <br />
        <BookList />
       <AddBook/>
      </div>
    </ApolloProvider>


  );
}

export default App;
