import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    DocumentChartBarIcon,
    PowerIcon,
    HomeIcon,
    CalendarDaysIcon,
    BookOpenIcon,
    CircleStackIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ApplicationLogo from "./ApplicationLogo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export default function Sidebar({ user, classname, auth }) {
    const [openAccordion, setOpenAccordion] = useState(null);

    const handleOpen = (value) => {
        setOpenAccordion(openAccordion === value ? null : value);
    };
    const logout = () => {
        MySwal.fire({
            title: "Logout?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Logout!",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(
                    route("logout"),
                    {},
                    {
                        preserveState: false,
                        onFinish: () => {
                            window.location.href = "/";
                        },
                    }
                )
                    .then((response) => {
                        MySwal.fire(
                            "Logout!",
                            "Berhasil Logout!.",
                            "success"
                        ).then(() => {});
                    })
                    .catch((error) => {
                        console.error(
                            "There was an error logging out. Please try again.",
                            error
                        );
                        MySwal.fire(
                            "Error!",
                            "There was an error logging out. Please try again.",
                            "error"
                        );
                    });
            }
        });
    };
    return (
        <Card
            className={`h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-sidebar ${classname}`}
        >
            <div className="mb-2 flex items-center flex-col text-textColor gap-4 p-4">
                <Link>
                    <ApplicationLogo className="bg-white p-3 rounded-2xl shadow-[0_1px_30px_#E8E3E7]" />
                </Link>
                <Typography>{user}</Typography>
            </div>
            <List>
                <Link href="/dashboard">
                    <ListItem className="hover:text-primary text-textColor ">
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Home
                    </ListItem>
                </Link>

                <Accordion
                    open={openAccordion === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                openAccordion === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem
                        className="p-0 hover:text-primary "
                        selected={openAccordion === 1}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className="border-b-0 p-3 group text-textColor group-hover:text-primary"
                        >
                            <ListItemPrefix>
                                <CircleStackIcon
                                    fill="none"
                                    stroke="black"
                                    className="h-5 w-5 group-hover:text-primary"
                                />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-normal text-textColor group-hover:text-primary">
                                System Management
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1 ">
                        <List className="p-0 text-textColor ">
                            <Link href="/daftar-pegawai">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Institusi
                                </ListItem>
                            </Link>
                            <Link href="/level-pegawai">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Jabatan
                                </ListItem>
                            </Link>
                            <Link href="/level-pegawai">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Daftar User
                                </ListItem>
                            </Link>
                            <Link href="/level-pegawai">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Daftar Laboratorium
                                </ListItem>
                            </Link>
                            <Link href="/level-pegawai">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Daftar Kelas
                                </ListItem>
                            </Link>
                            <Link href="/level-pegawai">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Tahun Ajaran
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion
                    open={openAccordion === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                openAccordion === 2 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem
                        className="p-0 hover:text-primary "
                        selected={openAccordion === 2}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className="border-b-0 p-3 group text-textColor group-hover:text-primary"
                        >
                            <ListItemPrefix>
                                <CalendarDaysIcon
                                    fill="none"
                                    stroke="black"
                                    className="h-5 w-5 group-hover:text-primary"
                                />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-normal text-textColor group-hover:text-primary">
                                Jadwal
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1 ">
                        <List className="p-0 text-textColor ">
                            <Link href="/tipe-kelas">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Tipe Kelas
                                </ListItem>
                            </Link>
                            <Link href="/daftar-kelas">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Daftar Kelas
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Accordion
                    open={openAccordion === 4}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                openAccordion === 4 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem
                        className="p-0 hover:text-primary "
                        selected={openAccordion === 4}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(4)}
                            className="border-b-0 p-3 group text-textColor group-hover:text-primary"
                        >
                            <ListItemPrefix>
                                <BookOpenIcon
                                    fill="none"
                                    stroke="black"
                                    className="h-5 w-5 group-hover:text-primary"
                                />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-normal text-textColor group-hover:text-primary">
                                Berita Acara
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1 ">
                        <List className="p-0 text-textColor ">
                            <Link href="/beritaacara_reguler">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Kelas Reguler
                                </ListItem>
                            </Link>
                            <Link href="/beritaacara_pengawas">
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Pengawas Ujian
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Link href="/home">
                    <ListItem className="hover:text-primary text-textColor ">
                        <ListItemPrefix>
                            <DocumentChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Report center
                    </ListItem>
                </Link>

                <hr className="my-2 border-blue-gray-50" />

                <Link>
                    <ListItem className="hover:text-primary text-textColor ">
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                </Link>
                <button onClick={logout}>
                    <ListItem className="hover:text-primary text-textColor">
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </button>
            </List>
        </Card>
    );
}
