// LogsModal.js
import React from "react";

const LogsModal = ({ open, logs, onClose }) => {
  if (!open) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[#2a2d38] p-4 sm:p-6 rounded-lg w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400 transition"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg sm:text-2xl font-bold mb-4">Logs</h2>

        {/* 
          WRAPPER FOR TABLE:
          - `max-h-80` restricts height and enables vertical scrolling 
          - `overflow-x-auto` enables horizontal scrolling if table is too wide
          - `overflow-y-auto` for vertical scrolling
          - `text-xs sm:text-sm` scales text size up on larger screens
        */}
        <div className="max-h-80 overflow-y-auto overflow-x-auto w-full text-xs sm:text-sm">
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
                  {/* `break-words` prevents large messages from overflowing */}
                  <td className="p-2 break-words">{log.message}</td>
                  <td className="p-2 break-words">{log.logger_name}</td>
                  <td className="p-2 whitespace-nowrap">{log.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsModal;
