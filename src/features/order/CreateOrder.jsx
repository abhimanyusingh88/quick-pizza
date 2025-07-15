import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSLice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  // Corrected 'adress' typo here to match Redux slice
  const { name, status, position, address } = useSelector((state) => state.user);
  const isLoading = status === "loading";
  console.log(address);

  const cart = useSelector(getCart);
  const navigation = useNavigation();
  // a method to check whether the form is been submitted or in process
  const isSubmitting = navigation.state === "submitting";

  // function handleSubmit(e)
  // {
  //     // e.preventDefault();
  // }

  // this method is used to get the returned data associated to that form  in case of no submission (usually used for error handling)
  const fromErrors = useActionData();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="ml-2">
      <h2 className="text-xl font-semibold mt-2 mb-8">Ready to order? Let's go!</h2>
      {/* fetch ,delete,post methods works her but get methods doesn't */}
      {/* <form method="POST" action="/order/new"> this also works but dont needed because nearset route will done by react itself */}
      {/* this is react router's form so that we can load form data */}
      {/* <Form method="POST" action="/order/new"  > */}
      {/* react automatically takes the nearest route in action */}

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={name}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {fromErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md">
                {fromErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 relative flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            {/* this input class coming from index.css file as reusable css using apply */}
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoading}
              defaultValue={address || ""}
              required
            />
          </div>
          {
            !address &&
          <span className="absolute right-[3px] z-10">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Position
            </Button>
          </span>
}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          {/* method to get a hidden input to get some required data inside from not visibly */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order......."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// jo bhi data hame action se chahihye from route wo sab yhi likhna padega
// this is the nearest action linked to a route and the form will access it
// request is a web api from react router and it gives the request that has been submitted
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data.phone);
  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // Initialize an empty errors object
  const errors = {};

  // Validate phone number and add error message if invalid
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please provide a valid phone number, we might need it to contact you in the future.";
  }

  // If there are errors, you can handle them here (e.g., show them in the UI)
  // Otherwise, proceed with creating the order
  if (Object.keys(errors).length > 0) {
    // You could return the errors here to show them on the form
    // e.g., return errors instead of redirecting
    return errors; // Modify this based on your needs
  }

  const newOrder = await createOrder(order);
  // dont over use it because it disables some performance optimizations of redux
  store.dispatch(clearCart());

  // Redirect to the order confirmation page
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
