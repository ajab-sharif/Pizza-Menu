/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import EmptyCart from './../cart/EmptyCart';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from './../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const isSubmiting = navigation.state === 'submitting';
  const fromError = useActionData();
  const {
    username,
    status: addressStatus,
    error: errorAddress,
    position,
    address,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="name" className="cursor-pointer sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            className="input grow"
            name="customer"
            defaultValue={username}
            id="name"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="cursor-pointer sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="input w-full"
              id="phone"
            />
            {fromError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {fromError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="cursor-pointer sm:basis-40" htmlFor="address">
            Address
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              id="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="absolute right-[5px] top-[35px] z-30 sm:top-[3px] md:top-1.5">
            {!position.latitude && !position.longitude && (
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 cursor-pointer accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 md:px-6 md:py-3"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="cursor-pointer font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmiting || isLoadingAddress}>
            {isSubmiting
              ? 'Placing order...'
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  console.log(order);
  const error = {};
  if (!isValidPhone(order.phone))
    error.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  if (Object.keys(error).length > 0) return error;

  //if everthing is ok create new order and redirect page
  const newOrder = await createOrder(order);
  //don't use overtime its not optimization
  store.dispatch(clearCart());
  // navigation not use becase naigate call only component
  // this redicrect page to new order page
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
