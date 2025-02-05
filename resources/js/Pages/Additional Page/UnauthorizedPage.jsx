import React from "react";
import UnauthorizedImage from "@/../../resources/images/Unauthorized.png";
import { Head } from "@inertiajs/react";

export default function UnauthorizedPage() {
    return (
        <>
            <Head title="403 Unauthorized" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-96">
                    <img
                        src={UnauthorizedImage}
                        alt="403 Unauthorized"
                        className="w-full h-full mb-8"
                    />
                </div>

                <h1 className="text-5xl font-bold text-gray-800 mb-4 tablet:text-3xl text-center">
                    403 Unauthorized
                </h1>
                <p className="text-xl text-gray-600 mb-4 tablet:text-lg text-center">
                    Oops! You're Unauthorized to Access This Page. Please
                    Contact Your Local Admin for More Details
                </p>
                <a
                    href="/dashboard"
                    className="text-lg text-primary font-bold hover:underline"
                >
                    Return to the main page
                </a>
            </div>
        </>
    );
}
