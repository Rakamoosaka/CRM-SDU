import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosDefault from "../axiosDefault";

const SubmissionPage = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [fileUploads, setFileUploads] = useState([]); // Updated to handle multiple files
  const [projectCategory, setProjectCategory] = useState("");
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosDefault.get("/categories/");
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories. Please try again later.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    if (files.length + fileUploads.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }
    setFileUploads((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !projectCategory ||
      !projectTitle ||
      !projectDescription ||
      !contactEmail ||
      !senderName
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (projectDeadline && new Date(projectDeadline) < new Date()) {
      alert("Deadline must be a future date.");
      return;
    }

    for (const file of fileUploads) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert("Only PDF, JPEG, or PNG files are allowed.");
        return;
      }

      if (file.size > maxSize) {
        alert("Each file size must be less than 5MB.");
        return;
      }
    }

    setLoading(true);

    try {
      const projectResponse = await axiosDefault.post("/projects/", {
        title: projectTitle,
        description: projectDescription,
        budget: parseFloat(projectBudget) || null,
        deadline: projectDeadline,
        sender_name: senderName,
        contact_email: contactEmail,
        category:
          categories.find((c) => c.name === projectCategory)?.id || null,
      });

      const projectId = projectResponse.data.id;

      for (const file of fileUploads) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("project", projectId);

        await axiosDefault.post("/attachments/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Project proposal submitted successfully!");
      setFileUploads([]); // Clear files after submission
    } catch (error) {
      console.error("Error submitting project proposal:", error);
      alert("Failed to submit the project proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1e26] flex flex-col items-center px-4 py-4">
      {/* Header */}
      <header className="w-full bg-[#2a2d38] py-4 px-6 sm:px-10 rounded-lg">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl text-white font-bold">
            SDU IT PARK
          </h1>
        </Link>
      </header>

      {/* Form Container */}
      <div className="w-full max-w-md sm:max-w-lg bg-[#2a2d38] p-6 sm:p-8 rounded-lg shadow-lg mt-8">
        <h2 className="text-white text-lg sm:text-xl font-bold text-center mb-6">
          Submit Your Project Proposal
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div>
            <label
              htmlFor="senderName"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
            />
          </div>
          <div>
            <label
              htmlFor="projectTitle"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Project Title
            </label>
            <input
              type="text"
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter your project title"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
            />
          </div>
          <div>
            <label
              htmlFor="projectDescription"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Project Description
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter your project description"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
              rows="4"
            />
          </div>
          <div>
            <label
              htmlFor="budget"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Budget
            </label>
            <input
              type="number"
              id="budget"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
              placeholder="Enter your budget"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
            />
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={projectDeadline}
              onChange={(e) => setProjectDeadline(e.target.value)}
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label
              htmlFor="category"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
              disabled={loadingCategories}
            >
              <option value="" disabled>
                {loadingCategories
                  ? "Loading categories..."
                  : "Select a category"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="fileUpload"
              className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
            >
              Attach Files (Max 5)
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              multiple
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
            />
            <ul className="mt-2 text-gray-400 text-sm">
              {fileUploads.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-[#33ADA9] text-white font-bold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={loading || loadingCategories}
          >
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionPage;
