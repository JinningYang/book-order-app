import { useEffect, useState } from 'react';

import classes from './AvailableBooks.module.css';
import Card from '../UI/Card';
import BookItem from './BookItem/BookItem'

// const DUMMY_BOOKS = [
//   {
//     id: 'b1',
//     name: 'Gone with the Wind',
//     description: 'Nominated as one of America’s best-loved novels',
//     price: 22.99,
//   },
//   {
//     id: 'b2',
//     name: 'War and Peace',
//     description: 'a historical novel',
//     price: 16.5,
//   },
//   {
//     id: 'b3',
//     name: 'Anna Karenina',
//     description: 'the best novel ever written and by Fyodor Dostoevsky',
//     price: 12.99,
//   },
//   {
//     id: 'b4',
//     name: 'Pride and Prejudice',
//     description: 'a romantic novel',
//     price: 18.99,
//   },
// ];

const AvailableBooks = () => {
  // const booksList = DUMMY_BOOKS.map((book) => (
  //   <BookItem
  //     key={book.id}
  //     id={book.id}
  //     name={book.name}
  //     description={book.description}
  //     price={book.price}
  //   />
  // ));

  // return (
  //   <section className={classes.books}>
  //     <Card>
  //       <ul>{booksList}</ul>
  //     </Card>
  //   </section>
  // );

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://react-http-6e523-default-rtdb.firebaseio.com/books.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();


      const loadedBooks = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };

    fetchBooks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.BooksLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.BooksError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const booksList = books.map((book) => (
    <BookItem
      key={book.id}
      id={book.id}
      name={book.name}
      description={book.description}
      price={book.price}
    />
  ));

  return (
    <section className={classes.books}>
      <Card>
        <ul>{booksList}</ul>
      </Card>
    </section>
  );

};

export default AvailableBooks;