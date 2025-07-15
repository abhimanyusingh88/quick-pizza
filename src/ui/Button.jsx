// import { Children } from "react";

import { Link } from "react-router-dom";

function Button({children,disabled,to,type,onClick})
{
    const base="  bg-yellow-400  uppercase text-sm font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
    // const ;
    const styles={
        primary: base+" px-4 py-3 md:px-6 md:py-4",
        small:base+" px-4 py-2 md:px-5 md:py-2.5 text-xs",
        
       round: base+ " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
       
        secondry:"  bg-transparent text-sm px-4 py-2.5 md:px-6 md:py-3.5 border-2 border-stone-300  uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:text-stone-800 hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed"
    }

    if(to)
    {
        return <Link to={to} className={styles[type]}>{children}</Link>
    }
    if(onClick)
    {
        return(
        
            <button onClick={onClick} disabled={disabled} className={styles[type]}>
            {children}
            </button>
            
        ) 
    }
    return(
        
        <button disabled={disabled} className={styles[type]}>
        {children}
        </button>
        
    )
} export default Button;