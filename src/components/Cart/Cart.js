import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  }

  const orderHandler = () => {
    setIsCheckout(true);
  }
  const submitOrderhandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch('https://food-order-app-b08e7-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItemAddHandler = (item) => {
    const addItem = {
      ...item,
      amount: 1
    }
    cartCtx.addItem(addItem);
  }

  const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map(item => <CartItem
      key={item.id}
      name={item.name}
      price={item.price} amount={item.amount}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)} />)}
  </ul>

  const modalAction = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>;

  const cartModalContent = <Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onCancel={props.onClose} onConfim={submitOrderhandler} />}
    {!isCheckout && modalAction}
  </Fragment>
  const isSubmittingModalConent = <p>Sending order data...</p>;
  const didSubmitModalContent = <Fragment>
    <p>Successfully sent the order</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>Close</button>
    </div>
  </Fragment>
  return <Modal onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalConent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>
}

export default Cart;