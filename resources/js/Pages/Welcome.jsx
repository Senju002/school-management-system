import { useEffect } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import MikrosilLogo from "@/../../public/images/logo_2.png";
import { Button, Input, Typography } from "@material-tailwind/react";
import CopyRightInformation from "@/Components/CopyRightInformation";

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
        <div className="flex flex-col justify-center gap-10 items-center h-screen mobile:h-full mobile:mt-10 ">
            <div className="flex flex-col md:flex-row px-5 justify-center gap-10 items-center  ">
                <Head title="Login" />
                <div className="w-full md:w-1/3 mb-5 md:mb-0">
                    <img src={MikrosilLogo} alt="#" className="w-full h-auto" />
                </div>
                <div className="w-full md:w-1/3">
                    <Typography
                        variant="h1"
                        className="font-bold text-2xl w-full mb-4 text-center md:text-left"
                    >
                        Website Manajemen Jadwal dan Honor Unit Tenaga Pengajar{" "}
                        <span className="text-primary font-extrabold">
                            Universitas Mikroskil
                        </span>
                    </Typography>
                    <Typography className="text-center md:text-left mb-4">
                        Sistem Informasi Manajemen Jadwal dan Honorarium
                        Berbasis Website
                    </Typography>
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                isFocused={true}
                                onChange={handleOnChange}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                error={errors.email}
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                isFocused={false}
                                autoComplete="current-password"
                                onChange={handleOnChange}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary  "
                                error={errors.password}
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
            <CopyRightInformation />
        </div>
    );
}
