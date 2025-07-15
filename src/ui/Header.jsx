import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
function Header()
{
    return  <header className="flex items-center justify-between bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200 sm:px-6 " >
        {/* widest is the max value width value in tailwind if we ant more just use  a [] and put inside px or rem */}
        <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
        <SearchOrder/>
        {/* <p>Jonas</p> */}
        <Username/>

        
    </header>
} export default Header;