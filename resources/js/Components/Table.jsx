export default function Table({ columns, data, onSort }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
                {/* Table Header */}
                <thead className="gap-4">
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="p-3 text-left cursor-pointer"
                                onClick={() => onSort && onSort(col.key)}
                            >
                                {col.label}
                                {onSort && <span className="ml-1"></span>}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
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
                                    <td key={col.key} className="p-3">
                                        {row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
