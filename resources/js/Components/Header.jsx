import React from "react";
import MikrosilLogo from "@/../../public/images/logo_2.png";
import { Typography } from "@material-tailwind/react";

const Header = ({ title }) => {
    return (
        <div className="flex justify-between p-5 items-center border-b-2 bg-white rounded-b-lg">
            <Typography className="text-primary text-2xl  font-bold">
                {title}
            </Typography>
            <img src={MikrosilLogo} alt="#" className="h-8 object-cover" />
        </div>
    );
};

export default Header;
