/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      delete
    </Button>
  );
}

export default DeleteItem;
