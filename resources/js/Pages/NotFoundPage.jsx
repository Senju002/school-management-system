import React from "react";
import ErrorImage from "@/../../resources/images/404.png";
import { Head } from "@inertiajs/react";

export default function NotFoundPage() {
    return (
        <>
            <Head title="404 Not Found" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-96">
                    <img
                        src={ErrorImage}
                        alt="404 Error"
                        className="w-full h-full mb-8"
                    />
                </div>

                <h1 className="text-5xl font-bold text-gray-800 mb-4 tablet:text-3xl text-center">
                    Oops! Page Not Found
                </h1>
                <p className="text-xl text-gray-600 mb-4 tablet:text-lg text-center">
                    The page you are looking for has been removed or might not
                    exist.
                </p>
                <a
                    href="/"
                    className="text-lg text-primary font-bold hover:underline"
                >
                    Return to the main page
                </a>
            </div>
        </>
    );
}
