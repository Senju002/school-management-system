import { Typography } from "@material-tailwind/react";
import React from "react";

export default function CopyRightInformation({ ClassName = "" }) {
    return (
        <div
            className={`flex justify-center items-center flex-col ${ClassName}`}
        >
            <Typography className="text-primary  tablet:text-sm pt-10">
                Version 1.0
            </Typography>
            <Typography className="text-primary tablet:text-sm">
                © Universitas Mikroskil 2025
            </Typography>
            <Typography className="text-primary text-xs">
                Created by Ame & SenJu
            </Typography>
        </div>
    );
}
