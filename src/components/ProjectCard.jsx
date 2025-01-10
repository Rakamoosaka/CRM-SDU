import React from "react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="bg-[#3a3f51] p-4 rounded-md cursor-pointer hover:bg-[#2e3346]"
      onClick={() => onClick(project)} // Trigger modal open
    >
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-base mb-2">
        <span className="font-semibold">Category:</span>{" "}
        <span className="font-normal">{project.category?.name || "N/A"}</span>
      </p>
      <p className="text-base mb-2">
        <span className="font-semibold">Status:</span>{" "}
        <span className="font-normal">{project.status}</span>
      </p>
    </div>
  );
};

export default ProjectCard;
