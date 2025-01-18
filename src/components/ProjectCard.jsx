import React from "react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="
        bg-[#3a3f51]
        p-5
        rounded-md
        cursor-pointer
        hover:bg-[#2e3346]
        transition-colors
        duration-200
        leading-relaxed
        /* Below: helps prevent horizontal overflow for super-long text */
        break-all
        overflow-clip
        word-break
        whitespace-pre-wrap
      "
      onClick={() => onClick(project)}
    >
      {/* Force the title to wrap instead of pushing the screen */}
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
        <span className="font-semibold">Status:</span>{" "}
        <span className="font-normal">{project.status}</span>
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
