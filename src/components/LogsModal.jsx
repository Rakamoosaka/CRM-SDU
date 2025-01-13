// LogsModal.js
import React from "react";

const LogsModal = ({ open, logs, onClose, loading, error }) => {
  if (!open) return null; // Don't render if modal is closed

  // Helper function to format an ISO date string (e.g. "2023-08-15T12:34:56Z") to "dd-mm-yyyy"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    // Fallback if invalid date
    if (isNaN(dateObj.getTime())) return dateString;

    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yyyy = dateObj.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[#2a2d38] p-4 sm:p-6 rounded-lg w-full max-w-4xl relative">
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
                    {/* Format the date here */}
                    <td className="p-2 whitespace-nowrap">
                      {formatDate(log.created_at)}
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
