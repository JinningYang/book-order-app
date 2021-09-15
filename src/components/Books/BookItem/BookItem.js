import { useContext } from 'react';

import BookItemForm from './BookItemForm';
import classes from './BookItem.module.css';
import CartContext from '../../../store/cart-context';

const BookItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.book}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <BookItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default BookItem;