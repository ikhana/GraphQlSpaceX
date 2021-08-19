import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { BooksQuery } from '../queries/Queries'
import { Bookdetails } from './Bookdetails';

const DisplayBooks = ({ loading, error, data, selectBook }) => {
    if (loading) return <p>Loading....</p>;
    if (error) return <p>Something went wrong</p>;
    return data.books.map(book => {
      return (
        <li key={book.id} onClick={() => selectBook(book.id)}>
          {book.name}
        </li>
      );
    });
  };
  
  export const BookList=()=> {
    const [selected, setSelected] = useState(null);
    const { loading, error, data } = useQuery(BooksQuery);
    const selectBook = id => setSelected(id);
    return (
      <div id="book-list">
        <li>
         <DisplayBooks
            loading={loading}
            error={error}
            data={data}
            selectBook={selectBook}
          />
        </li>
        <Bookdetails bookId={selected} />
      </div>
    );
  }

