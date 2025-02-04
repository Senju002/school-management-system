const Table = ({ title, data, onAddClick }) => {
    if (!data.length) return <p className="text-gray-500 text-center py-4">Loading {title}...</p>;
    const columns = Object.keys(data[0]).slice(0, 2); // Show only the first 2 columns

    return (
        <div className="mb-6 p-6 bg-white shadow-lg rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <button 
                    onClick={onAddClick} 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition">
                    + Add {title}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            {columns.map((col, index) => (
                                <th key={index} className="px-4 py-3 text-left uppercase tracking-wider w-1/2">
                                    {col.replace(/_/g, " ")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-4 py-3 text-gray-700 border-b w-1/2 truncate">
                                        {row[col]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
