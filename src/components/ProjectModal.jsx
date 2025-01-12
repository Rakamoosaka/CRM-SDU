// ProjectModal.js
import React from "react";

const ProjectModal = ({
  project,
  comment,
  onCommentChange,
  onClose,
  onAccept,
  onReject,
}) => {
  if (!project) return null; // Do not render if no project is selected

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[#2a2d38] p-6 rounded-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400 transition"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">{project.title}</h3>
        <p className="text-sm sm:text-base mb-2">{project.description}</p>
        <p className="text-sm sm:text-base mb-2">
          <span className="font-semibold">Status:</span> {project.status}
        </p>
        <p className="text-sm sm:text-base mb-2">
          <span className="font-semibold">Attachments:</span>
          {project.attachments?.length > 0 ? (
            project.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.file}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:underline"
              >
                {attachment.name || `Attachment ${index + 1}`}
              </a>
            ))
          ) : (
            <span> None</span>
          )}
        </p>
        <textarea
          placeholder="Enter your comment..."
          className="w-full p-2 mt-2 bg-[#1c1e26] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-[#33ADA9] px-4 py-2 rounded text-white hover:bg-teal-600 transition"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 transition"
            onClick={onReject}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
