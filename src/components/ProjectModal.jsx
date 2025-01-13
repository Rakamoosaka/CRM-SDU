import React from "react";

const ProjectModal = ({
  project,
  comment,
  onCommentChange,
  onClose,
  onAccept,
  onReject,
  actionLoading, // "accept" | "reject" | null
}) => {
  // Instead of not rendering at all, we always render a wrapper
  // and just toggle opacity, pointer-events, etc.
  const isOpen = Boolean(project); // or: !!project

  // Format creation date (unchanged)
  let formattedCreatedDate = "";
  if (project?.created_at) {
    const dateObj = new Date(project.created_at);
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yyyy = dateObj.getFullYear();
    formattedCreatedDate = `${dd}-${mm}-${yyyy}`;
  }

  const isAccepting = actionLoading === "accept";
  const isRejecting = actionLoading === "reject";

  return (
    <div
      className={`
        fixed inset-0 z-50 p-4 
        bg-black bg-opacity-50 
        flex justify-center items-center
        transition-opacity duration-300
        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      {/* Modal content container */}
      <div
        className={`
          bg-[#2a2d38] p-6 rounded-lg w-full max-w-lg relative
          transition-transform duration-300
          ${isOpen ? "scale-100" : "scale-95"}
        `}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400 transition-colors duration-200"
          onClick={onClose}
          disabled={isAccepting || isRejecting}
        >
          &times;
        </button>

        {/* We can safely check if project is present for the content */}
        {project && (
          <>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              {project.title}
            </h3>

            <div className="max-h-40 overflow-y-auto pr-2 mb-4">
              <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                {project.description}
              </p>
            </div>

            <p className="text-sm sm:text-base mb-2">
              <span className="font-semibold">Status:</span> {project.status}
            </p>

            {project.created_at && (
              <p className="text-sm sm:text-base mb-2">
                <span className="font-semibold">Created At:</span>{" "}
                {formattedCreatedDate}
              </p>
            )}

            {project.budget && (
              <p className="text-sm sm:text-base mb-2">
                <span className="font-semibold">Budget:</span> {project.budget}
              </p>
            )}

            {project.sender_name && (
              <p className="text-sm sm:text-base mb-2">
                <span className="font-semibold">Sender Name:</span>{" "}
                {project.sender_name}
              </p>
            )}

            {project.contact_email && (
              <p className="text-sm sm:text-base mb-2">
                <span className="font-semibold">Contact Email:</span>{" "}
                {project.contact_email}
              </p>
            )}

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

            {/* Comment Textarea */}
            <textarea
              placeholder="Enter your comment..."
              className="w-full p-2 mt-2 bg-[#1c1e26] border border-gray-600 rounded text-white 
                         focus:outline-none focus:ring-2 focus:ring-[#33ADA9] 
                         transition-all duration-200"
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              disabled={isAccepting || isRejecting}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={onAccept}
                disabled={isRejecting || isAccepting}
                className="bg-[#33ADA9] px-4 py-2 rounded text-white 
                           hover:bg-teal-600 transition-colors duration-200
                           disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAccepting ? "Accepting..." : "Accept"}
              </button>
              <button
                onClick={onReject}
                disabled={isRejecting || isAccepting}
                className="bg-gray-700 px-4 py-2 rounded text-white 
                           hover:bg-gray-600 transition-colors duration-200
                           disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isRejecting ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
