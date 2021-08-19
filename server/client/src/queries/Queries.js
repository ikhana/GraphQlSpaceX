import {  gql } from '@apollo/client';

export const AuthorsQuery = gql`
query GetAuthors{
    authors{
        name
        id
       
    }
}
`

export const BooksQuery = gql`
query GetBooks{
    books{
        name
        id
        genre
        
    }
}`

export  const addBookMutation = gql`
mutation AddBook(
    $name: String!, 
    $genre: String!, 
    $authorId: ID!
    ) {
      addBook(name: $name,
         genre: $genre,
          authorId: $authorId
          ) {
          name
          id
          }
}`

export const singleBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            author{
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;