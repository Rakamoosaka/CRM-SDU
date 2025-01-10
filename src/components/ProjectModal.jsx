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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2a2d38] p-6 rounded-lg w-[40%] relative">
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
        <p className="mb-2">{project.description}</p>
        <p className="mb-2">
          <span className="font-semibold">Status:</span> {project.status}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Attachments:</span>
          {project.attachments?.length > 0 ? (
            project.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.file} // Assuming the backend provides a file URL
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
          className="w-full p-2 mt-2 bg-[#1c1e26] border border-gray-600 rounded text-white"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-green-600 px-4 py-2 rounded text-white"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-red-600 px-4 py-2 rounded text-white"
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
