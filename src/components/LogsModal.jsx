import React from "react";

const LogsModal = ({ open, logs, onClose, loading, error }) => {
  return (
    <div
      className={`
        fixed inset-0 z-50 p-4 
        bg-black bg-opacity-50 
        flex justify-center items-center
        transition-opacity duration-300
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        className={`
          bg-[#2a2d38] p-4 sm:p-6 rounded-lg w-full max-w-4xl relative
          transition-transform duration-300
          ${open ? "scale-100" : "scale-95"}
        `}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400 transition-colors duration-200"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg sm:text-2xl font-bold mb-4">Logs</h2>

        {loading ? (
          <p>Loading logs...</p>
        ) : error ? (
          <p className="text-red-400 mb-4">{error}</p>
        ) : logs.length === 0 ? (
          <p>No logs found.</p>
        ) : (
          <div className="max-h-96 overflow-y-auto overflow-x-auto w-full text-xs sm:text-sm">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="whitespace-nowrap p-2 border-b border-gray-600 text-left">
                    Message
                  </th>
                  <th className="whitespace-nowrap p-2 border-b border-gray-600 text-left">
                    Logger
                  </th>
                  {/* NEW: Add Interacted By column */}
                  <th className="whitespace-nowrap p-2 border-b border-gray-600 text-left">
                    Interacted By
                  </th>
                  <th className="whitespace-nowrap p-2 border-b border-gray-600 text-left">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index} className="border-b border-gray-600">
                    <td className="p-2 break-words">{log.message}</td>
                    <td className="p-2 break-words">{log.logger_name}</td>
                    {/* NEW: Display interacted_by */}
                    <td className="p-2 break-words">{log.interacted_by}</td>
                    <td className="p-2 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsModal;
