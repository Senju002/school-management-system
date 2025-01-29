import { useEffect } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import MikrosilLogo from "@/../../public/images/logo_2.png";
import { Button } from "@material-tailwind/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="flex flex-col md:flex-row py-[30vh] px-5 justify-center gap-10 items-center">
            <Head title="Login" />
            <div className="w-full md:w-1/3 mb-5 md:mb-0">
                <img src={MikrosilLogo} alt="#" className="w-full h-auto" />
            </div>
            <div className="w-full md:w-1/3">
                <h1 className="font-bold text-2xl w-full mb-4 text-center md:text-left">
                    Website Manajemen Jadwal dan Honor Unit Tenaga Pengajar
                    Universitas Mikroskil
                </h1>
                <p className="text-center md:text-left mb-4">
                    Sistem Informasi Manajemen Jadwal dan Honorarium Berbasis
                    Website
                </p>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Username
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            isFocused={true}
                            onChange={handleOnChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={handleOnChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6">
                        <Button
                            // disabled={processing}
                            loading={processing}
                            ripple={true}
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-4 px-4 hover:bg-primary/80 transition duration-300 flex justify-center items-center"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
