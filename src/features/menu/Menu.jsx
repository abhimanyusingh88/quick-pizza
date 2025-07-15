import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // getting the required data here using this useLoader method from react router
 const menu= useLoaderData();
 console.log(menu);
  return <ul className="divide-y divide-stone-200 px-2">
    { menu.map(pizza=><MenuItem pizza={pizza} key={pizza.id}/>)}
  </ul>
}
// creating loader for menu
// 1. create the loader
// 2. connect the loader 
// 3. provide the loader
// render as you fetch  (do not create waterfalls)
export async function Loader()
{
  // getting the required data from the api
  const menu= await getMenu();
  return menu;
}

export default Menu;
