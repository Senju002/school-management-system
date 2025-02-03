export default function Table({ columns, data, title, extraClassNames }) {
    return (
        <div className={`w-[100%] mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow ${extraClassNames}`}>
            {/* Title and Button Section */}
            {title && (
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse table-fixed"> {/* Add table-fixed here */}
                    <thead className="gap-4">
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="p-3 text-left cursor-pointer"
                                    style={{ width: `${100 / columns.length}%` }} // Distribute width equally
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="gap-4">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="p-3 text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className="p-3" style={{ width: `${100 / columns.length}%` }}> {/* Equal width */}
                                            {row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
