const Table = ({ title, data, onAddClick, onEditClick, handleDelete }) => {
    // Handle case where data is empty
    if (!data || data.length === 0) {
        return (
            <p className="text-gray-500 text-center py-4">
                Loading {title}...
            </p>
        );
    }

    // Extract relevant columns (assuming at least one row exists)
    const columns = Object.keys(data[0]).slice(1, 3);

    return (
        <div className="mb-6 p-6 bg-white shadow-lg rounded-xl">
            {/* Header Section with Title and Add Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <button
                    onClick={onAddClick}
                    className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg shadow-md transition"
                >
                    + Add {title}
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse rounded-lg overflow-hidden shadow-md">
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
                            <th className="px-4 py-3 text-left w-1/4">Actions</th>
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
                                <td className="px-4 py-3 text-gray-700 border-b w-1/4 flex gap-2">
                                    <button
                                        onClick={() => onEditClick(row)}
                                        className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(row.id, title)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                        Delete
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
