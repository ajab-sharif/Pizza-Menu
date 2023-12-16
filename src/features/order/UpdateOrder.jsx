/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { useEffect } from 'react';
import { updateOrder } from '../../services/apiRestaurant';
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  useEffect(function () {}, []);
  return (
    <fetcher.Form method="PATCH">
      <Button type="primary" className="text-right">
        make priority
      </Button>
      ;
    </fetcher.Form>
  );
}

export default UpdateOrder;
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
