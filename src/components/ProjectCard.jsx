import React from "react";

// Map each status to a specific Tailwind color combination
const statusStyles = {
  NEW: "bg-blue-200 text-blue-800",
  IN_PROGRESS: "bg-blue-400 text-white",
  REJECTED: "bg-red-200 text-red-800",
  ACCEPTED: "bg-green-200 text-green-800",
  COMPLETED: "bg-green-400 text-white",
};

const ProjectCard = ({ project, onClick }) => {
  // Determine status color classes or default to something neutral
  const badgeStyle =
    statusStyles[project.status] || "bg-gray-200 text-gray-800";

  return (
    <div
      className="
        relative 
        bg-[#3a3f51]
        p-5
        rounded-md
        cursor-pointer
        hover:bg-[#2e3346]
        transition-colors
        duration-200
        leading-relaxed
        break-all
        overflow-clip
        whitespace-pre-wrap
        word-break
      "
      onClick={() => onClick(project)}
    >
      {/* Status badge in the top-left corner */}
      <span
        className={`
          absolute
          -top-0.5
          -left-0.5
          px-2
          py-1
          text-sm
          font-semibold
          rounded
          shadow
          ${badgeStyle}
        `}
      >
        {project.status}
      </span>

      {/* Card content */}
      <h3
        className="
          text-xl
          font-bold
          mb-2
          text-white
          break-all
          overflow-clip
          whitespace-pre-wrap
          word-break
          mt-8
        "
      >
        {project.title}
      </h3>

      <p
        className="
          text-sm
          sm:text-base
          text-gray-200
          mb-2
          break-all
          whitespace-pre-wrap
        "
      >
        <span className="font-semibold">Category:</span>{" "}
        <span className="font-normal">{project.category?.name || "N/A"}</span>
      </p>

      <p
        className="
    text-sm
    sm:text-base
    text-gray-200
    mb-2
    break-all
    whitespace-pre-wrap
  "
      >
        <span className="font-semibold">Description:</span>{" "}
        <span className="font-normal">
          {project.description.length > 50
            ? `${project.description.slice(0, 50)}...`
            : project.description}
        </span>
      </p>

      {project.priority && (
        <p
          className="
            text-sm
            sm:text-base
            text-gray-200
            break-all
            whitespace-pre-wrap
          "
        >
          <span className="font-semibold">Priority:</span>{" "}
          <span className="font-normal">{project.priority}</span>
        </p>
      )}
    </div>
  );
};

export default ProjectCard;
