import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout()
{
    const navigation= useNavigation();
    const isLoading= navigation.state==="loading";
    return(
        <div className="grid h-[500px] h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loader/>}
            <Header/>
            <div className="overflow-scroll">
            <main className=" max-w-3xl mx-auto ">
                {/* <h1>content</h1> */}
                <Outlet/>
            </main>
            </div>
            <CartOverview/>
        </div>
    )
} export default AppLayout;