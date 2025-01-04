import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubmissionPage = () => {
  const categories = [
    "Technology",
    "Design",
    "Business",
    "Marketing",
    "Healthcare",
    "Education",
    "Environment",
    "Social",
    "Energy",
    "Infrastructure",
    "Agriculture",
    "Other",
  ];

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [projectCategory, setProjectCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh
    console.log("Project Title:", projectTitle);
    console.log("Project Description:", projectDescription);
    console.log("Project Budget:", projectBudget);
    console.log("Deadline:", projectDeadline);
    console.log("Contact Email:", contactEmail);
    console.log(
      "Attached File:",
      fileUpload ? fileUpload.name : "No file attached"
    );
    console.log("Project Category:", projectCategory);
  };

  return (
    <div className="min-h-screen bg-[#1c1e26] flex flex-col items-center justify-center">
      <header className="w-full bg-[#2a2d38] py-4 px-10">
        <Link to="/">
          <h1 className="text-2xl text-white font-bold">SDU IT PARK</h1>
        </Link>
      </header>
      <div className="w-full max-w-md bg-[#2a2d38] p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-white text-lg font-bold text-center mb-6">
          Submit Your Project Proposal
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="projectTitle"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Project Title
            </label>
            <input
              type="text"
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter your project title"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="projectDescription"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Project Description
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter your project description"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white opacity-50"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white opacity-50"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="budget"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Budget
            </label>
            <input
              type="number"
              id="budget"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
              placeholder="Enter your budget"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={projectDeadline}
              onChange={(e) => setProjectDeadline(e.target.value)}
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="fileUpload"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Attach Files
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={(e) => setFileUpload(e.target.files[0])}
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#33ADA9] text-white font-bold rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:ring-[#33ADA9]"
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionPage;
