import React from "react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="bg-[#3a3f51] p-4 rounded-md cursor-pointer 
                 hover:bg-[#2e3346] transition-colors duration-200"
      onClick={() => onClick(project)}
    >
      <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-sm sm:text-base mb-2">
        <span className="font-semibold">Category:</span>{" "}
        <span className="font-normal">{project.category?.name || "N/A"}</span>
      </p>
      <p className="text-sm sm:text-base mb-2">
        <span className="font-semibold">Status:</span>{" "}
        <span className="font-normal">{project.status}</span>
      </p>
      {project.priority && (
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Priority:</span>{" "}
          <span className="font-normal">{project.priority}</span>
        </p>
      )}
    </div>
  );
};

export default ProjectCard;
