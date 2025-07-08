import React from "react";
 const Navbar=()=>{
   return(
    <nav className="flex justify-around bg-indigo-500 text-white py-2">
        <div>
            <span className="text-2xl font-bold mx-8">
                my todo
            </span>
        </div>
        <ul className="flex gap-14">
            <li className="cursor-pointer hover:text-2xl hover:text-shadow-black
            transition-all duration-300 delay-100">home</li>
            <li className="cursor-pointer hover:text-2xl hover:text-shadow-black
            transition-all duration-300 delay-100">your task</li>
        </ul>
    </nav>
   ); 

}
export default Navbar;