import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Table = ({ title, data, onAddClick, onEditClick, handleDelete }) => {
    // Handle case where data is empty
    if (!data || data.length === 0) {
        return (
            <p className="text-gray-500 text-center py-4">Loading {title}...</p>
        );
    }
    // Determine column selection logic
    let columns = Object.keys(data[0]);
    if (title === "Assigned Roles") {
        columns = columns.slice(1, 4);
    } else if (title === "Class Lists") {
        columns = columns.slice(0, 5);
    } else if (
        title === "Jenis Institusi" ||
        title === "Group Institusi" ||
        title === "Daftar Institusi" ||
        title === "Academic Year"
    ) {
        columns = columns.slice(0, 2);
    } else if (title === "Schedules") {
        columns = columns.slice(1, 6);
    } else {
        columns = columns.slice(0, 3);
    }

    return (
        <div className="mb-6 p-6 bg-white shadow-lg rounded-xl">
            {/* Header Section with Title and Add Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-primary uppercase mobile:text-sm ">
                    {"Tabel " + title}
                </h2>
                <Button
                    onClick={onAddClick}
                    className=" bg-primary rounded-lg shadow-md transition w-60  mobile:text-xs mobile:w-52"
                >
                    + Add {title}
                </Button>
            </div>

            {/* Table Section */}
            <div className="overflow-scroll">
                <table className="w-full  border-collapse rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-primary text-white">
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    className="px-4 py-3 text-left uppercase tracking-wider w-1/4"
                                >
                                    {col.replace(/_/g, " ")}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-center w-1/4">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-gray-200 transition"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col}
                                        className="px-4 py-3 text-gray-700 border-b w-1/4 truncate"
                                    >
                                        {row[col]}
                                    </td>
                                ))}
                                <td className="px-4 items-center justify-center py-3 text-gray-700 border-b  w-full flex gap-10">
                                    <button onClick={() => onEditClick(row)}>
                                        <Tooltip
                                            content={"Edit " + title}
                                            animate={{
                                                mount: {
                                                    scale: 1,
                                                    y: 0,
                                                },
                                                unmount: {
                                                    scale: 0,
                                                    y: 25,
                                                },
                                            }}
                                            className="bg-green-600"
                                        >
                                            <IconButton
                                                variant="fill"
                                                color="green"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(row.id, title)
                                        }
                                    >
                                        <Tooltip
                                            content={"Delete " + title}
                                            animate={{
                                                mount: {
                                                    scale: 1,
                                                    y: 0,
                                                },
                                                unmount: {
                                                    scale: 0,
                                                    y: 25,
                                                },
                                            }}
                                            className="bg-red-600"
                                        >
                                            <IconButton
                                                variant="fill"
                                                color="red"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
