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

  // Format creation date
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
          bg-[#2a2d38] p-6 sm:p-8 rounded-lg w-full max-w-lg relative
          transition-transform duration-300
          leading-relaxed
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
            {/* Force wrapping of extremely long titles */}
            <h3 className="text-2xl font-bold mb-4 text-white break-all">
              {project.title}
            </h3>

            <div className="max-h-64 overflow-y-auto pr-3 mb-4 text-gray-200">
              {/* Force wrapping for the description */}
              <p className="text-base whitespace-pre-wrap break-all">
                {project.description}
              </p>
            </div>

            <p className="text-base text-gray-200 mb-2">
              <span className="font-semibold">Status:</span> {project.status}
            </p>

            {project.priority && (
              <p className="text-base text-gray-200 mb-2">
                <span className="font-semibold">Priority:</span>{" "}
                {project.priority}
              </p>
            )}

            {project.created_at && (
              <p className="text-base text-gray-200 mb-2">
                <span className="font-semibold">Created At:</span>{" "}
                {formattedCreatedDate}
              </p>
            )}

            {project.budget && (
              <p className="text-base text-gray-200 mb-2">
                <span className="font-semibold">Budget:</span> {project.budget}
              </p>
            )}

            {project.sender_name && (
              <p className="text-base text-gray-200 mb-2">
                <span className="font-semibold">Sender Name:</span>{" "}
                {project.sender_name}
              </p>
            )}

            {project.contact_email && (
              <p className="text-base text-gray-200 mb-2">
                <span className="font-semibold">Contact Email:</span>{" "}
                {project.contact_email}
              </p>
            )}

            <p className="text-base text-gray-200 mb-2">
              <span className="font-semibold">Attachments:</span>
              {project.attachments?.length > 0 ? (
                project.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 hover:underline mt-1"
                  >
                    {attachment.name || `Attachment ${index + 1}`}
                  </a>
                ))
              ) : (
                <span> None</span>
              )}
            </p>

            {/* Hide comment area for COMPLETED or REJECTED projects */}
            {project.status !== "COMPLETED" &&
              project.status !== "REJECTED" && (
                <>
                  <label
                    htmlFor="projectComment"
                    className="block text-gray-300 mt-4 mb-1"
                  >
                    Your Comment
                  </label>
                  <textarea
                    id="projectComment"
                    placeholder="Enter your comment..."
                    className="w-full p-2 bg-[#1c1e26] border border-gray-600 rounded
                             text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                             transition-all duration-200 leading-relaxed"
                    value={comment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    disabled={
                      isAccepting || isRejecting || isStarting || isCompleting
                    }
                  />
                </>
              )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-6 justify-end">
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

              {project.status === "ACCEPTED" && (
                <button
                  onClick={onStart}
                  disabled={
                    isAccepting || isRejecting || isStarting || isCompleting
                  }
                  className="bg-green-200 text-green-800 px-4 py-2 rounded
                             hover:bg-blue-400 hover:text-white transition-colors duration-200
                             disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isStarting ? "Starting..." : "Start"}
                </button>
              )}

              {project.status === "IN_PROGRESS" && (
                <button
                  onClick={onComplete}
                  disabled={
                    isAccepting || isRejecting || isStarting || isCompleting
                  }
                  className="bg-blue-400 px-4 py-2 rounded text-white
                             hover:bg-green-400 transition-colors duration-200
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
