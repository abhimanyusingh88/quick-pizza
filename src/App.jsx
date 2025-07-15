import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu,{Loader as menuLoader} from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder,{action as loadOrderAction} from "./features/order/CreateOrder"
import Order from "./features/order/Order"
import AppLayout from  "./ui/appLayout";
import Error from "./ui/Error";
import {loader as orderLoader } from "./features/order/Order";


// if we have data fetching and data loading in react router then we have to implement router like this
const router=createBrowserRouter([
  {
      element:<AppLayout/>,
      errorElement:<Error/>,
      children:[
        {
          path:"/",
          element:<Home/>
        
        },
        {
          path:"/menu",
          element:<Menu/>,
          // connecting the laoder to our menu to fetch the required data in the menu page using maodern react router
          loader:menuLoader,
          // here mainly fethcing operation is going on so we are adding it also here so thet error can be shown in the menu page also itself
          errorElement:<Error/>,
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/order/:orderId",element:<Order/>, loader:orderLoader,errorElement:<Error/>,
        },
        {
          path:"/order/new", element:<CreateOrder/>,action:loadOrderAction
        },


      ]
  },
  
])
function App()
{
  return <RouterProvider router={router}/>
}
export default App;