import {
  // calcMinutesLeft,
  formatCurrency,
  // formatDate,
} from "../../utils/helpers";
import Button from '../../ui/Button';
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSLice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";



function MenuItem({ pizza }) {
  const dispatch=useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity=useSelector(getCurrentQuantityById(id));
  
  function handleAddToCart()
  {
     const newItem={
      pizzaId:id,
      name,
      quantity:1,
      unitPrice,
      totalPrice:unitPrice,
     }
     dispatch(addItem(newItem));

  }
  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut?"opacity-70 grayscale":"" }`} />
      <div className=" flex flex-col grow pt-0.5 ">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between ">
        
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text sm font-medium uppercase text-stone-500">Sold out</p>}
         { currentQuantity!==0 && (<div className="flex items-center gap-3 sm:gap-8">
          <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
         <DeleteItem id={id}/>
         </div>
  )}

          { currentQuantity===0 && !soldOut &&<Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
          
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
