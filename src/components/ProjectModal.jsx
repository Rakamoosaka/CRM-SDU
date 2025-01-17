import React from "react";

const ProjectModal = ({
  project,
  comment,
  onCommentChange,
  onClose,
  onAccept,
  onReject,
  onStart,
  onComplete,
  actionLoading, // "accept" | "reject" | "start" | "complete" | null
}) => {
  const isOpen = Boolean(project);

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
  const isStarting = actionLoading === "start";
  const isCompleting = actionLoading === "complete";

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
          disabled={isAccepting || isRejecting || isStarting || isCompleting}
        >
          &times;
        </button>

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
            {project.priority && (
              <p className="text-sm sm:text-base mb-2">
                <span className="font-semibold">Priority:</span>{" "}
                {project.priority}
              </p>
            )}
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

            {/* Comment Textarea (for Accept/Reject) */}
            <textarea
              placeholder="Enter your comment..."
              className="w-full p-2 mt-2 bg-[#1c1e26] border border-gray-600 rounded 
                         text-white focus:outline-none focus:ring-2 focus:ring-[#33ADA9] 
                         transition-all duration-200"
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              disabled={
                isAccepting || isRejecting || isStarting || isCompleting
              }
            />

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-4 justify-end">
              {/* Accept only if status = NEW */}
              {project.status === "NEW" && (
                <button
                  onClick={onAccept}
                  disabled={
                    isAccepting || isRejecting || isStarting || isCompleting
                  }
                  className="bg-[#33ADA9] px-4 py-2 rounded text-white 
                             hover:bg-teal-600 transition-colors duration-200
                             disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAccepting ? "Accepting..." : "Accept"}
                </button>
              )}

              {/* Reject only if status = NEW */}
              {project.status === "NEW" && (
                <button
                  onClick={onReject}
                  disabled={
                    isAccepting || isRejecting || isStarting || isCompleting
                  }
                  className="bg-gray-700 px-4 py-2 rounded text-white 
                             hover:bg-gray-600 transition-colors duration-200
                             disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isRejecting ? "Rejecting..." : "Reject"}
                </button>
              )}

              {/* Start only if status = ACCEPTED */}
              {project.status === "ACCEPTED" && (
                <button
                  onClick={onStart}
                  disabled={
                    isAccepting || isRejecting || isStarting || isCompleting
                  }
                  className="bg-green-600 px-4 py-2 rounded text-white 
                             hover:bg-green-500 transition-colors duration-200
                             disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isStarting ? "Starting..." : "Start"}
                </button>
              )}

              {/* Complete only if status = IN_PROGRESS */}
              {project.status === "IN_PROGRESS" && (
                <button
                  onClick={onComplete}
                  disabled={
                    isAccepting || isRejecting || isStarting || isCompleting
                  }
                  className="bg-blue-600 px-4 py-2 rounded text-white 
                             hover:bg-blue-500 transition-colors duration-200
                             disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCompleting ? "Completing..." : "Complete"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
