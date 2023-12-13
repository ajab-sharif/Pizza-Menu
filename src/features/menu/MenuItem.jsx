/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import Button from './../../ui/Button';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

/* eslint-disable react/prop-types */
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-slate-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex gap-2 md:gap-3">
              <UpdateItemQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
