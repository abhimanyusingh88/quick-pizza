import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSLice';
import { getName } from '../user/userSlice';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];


function Cart() {
  // const userName=useSelector((state)=>state.user.userName);
  const userName= useSelector(getName);
  const cart = useSelector(getCart);
  const dispatch=useDispatch();
  if(!cart.length) return <EmptyCart/>;

  return (
    <div className='px-4 py-3 '>
      <LinkButton to="/menu" >&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>
      <ul className='divide-y divide-stone-200 border-b mt-3'>
  {cart.map((item) => (
    <CartItem key={item.pizzaId} item={item} />
  ))}
</ul>


      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type="primary">Order Pizzas</Button>
        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button type="secondry" onClick={()=>dispatch(clearCart())}>Clear Cart</Button>
        {/* <button>Clear cart</button> */}
      </div>
    </div>
  );
}

export default Cart;
