import React from "react";
import MikrosilLogo from "@/../../public/images/logo_2.png";

const Header = ({ title }) => {
    return (
        <div className="flex justify-between p-5 items-center border-b-2">
            <h1 className="text-black text-3xl font-bold">{title}</h1>
            <img src={MikrosilLogo} alt="#" className="h-16 object-cover"/>
        </div>  
    );
};

export default Header;
