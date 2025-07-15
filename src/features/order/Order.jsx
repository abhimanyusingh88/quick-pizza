// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };
// to load different route's data without going to that route can be done via fetcher function provided by react router

function Order() {
  // getting the loader data from the route loader
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(function () {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  console.log(fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-6 px-4 space-y-8">
      <div className="flex gap-2 items-center justify-between flex-wrap">
        <h2 className="text-xl font-semibold">Order {id} Status</h2>

        <div>
          {priority && (
            <span className="bg-red-500 rounded-full px-3 py-1 text-sm font-semibold uppercase text-red-50 tracking-wide mr-1">
              Priority
            </span>
          )}
          <span className="bg-green-500 rounded-full px-3 py-1 text-sm font-semibold uppercase text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex gap-2 bg-stone-200 px-6 py-5 items-center justify-between flex-wrap">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-stone-200 divide-y border-b border-t">
        {fetcher.state === "loading" && <p>Loading ingredients...</p>}
        {cart.map((item) => {
          const pizzaData = fetcher.data?.find(
            (ele) => ele.id === item.pizzaId
          );
          return (
            <OrderItem
              item={item}
              key={item.id}
              ingredients={pizzaData?.ingredients || []}
              isLoadingIngredients={!fetcher.data}
            />
          );
        })}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p>Price priority: {formatCurrency(priorityPrice)}</p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
