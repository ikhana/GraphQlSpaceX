import React from 'react';
import {useQuery} from '@apollo/client';
import {singleBookQuery} from '../queries/Queries';

const displayBookDetails = (loading, data, error) => {
    if (loading) return <p>loading...</p>
    if (error) return <p>Something went wrong..</p>
    if (data.book) {
        return (
            <div>
                <h2>{data.book.name}</h2>
                <p>{data.book.genre}</p>
                <p> <span>Author name: </span> {data.book.author.name}</p>
                <p>All the books by the author: </p>
                <ul className="other-books">
                    {data.book.author.books.map(item =>{
                        return<li key={item.id}>{item.name}</li>
                    })
                    }
                </ul>
            </div>
        )
    }else{
        return(
            <div>
                No data to display..
            </div>
        )
    }
}

export const Bookdetails = (props) => {
    const { loading, data, error } = useQuery(singleBookQuery, {
        variables: {
            id: props.bookId
        }
    });

    

    /*const { loading, error, data } = useQuery(singleBookQuery, {
        variables: {props.bookid}
      });
      if (loading) return <p>Loading ...</p>;
      if (error) return <p>Error</p>
         console.log(data)*/
    return (
        <div id="book-details">
        <p>OutPut here</p>
        {displayBookDetails(loading, data, error)}
    </div>
    )
}
