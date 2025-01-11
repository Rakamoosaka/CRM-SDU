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
  const [fileUpload, setFileUpload] = useState(null);
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

    if (fileUpload) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(fileUpload.type)) {
        alert("Only PDF, JPEG, or PNG files are allowed.");
        return;
      }

      if (fileUpload.size > maxSize) {
        alert("File size must be less than 5MB.");
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

      if (fileUpload) {
        const formData = new FormData();
        formData.append("file", fileUpload);
        formData.append("project", projectId);

        await axiosDefault.post("/attachments/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Project proposal submitted successfully!");
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
          {[
            {
              id: "senderName",
              label: "Your Name",
              value: senderName,
              onChange: setSenderName,
              type: "text",
              placeholder: "Enter your name",
            },
            {
              id: "projectTitle",
              label: "Project Title",
              value: projectTitle,
              onChange: setProjectTitle,
              type: "text",
              placeholder: "Enter your project title",
            },
            {
              id: "projectDescription",
              label: "Project Description",
              value: projectDescription,
              onChange: setProjectDescription,
              type: "textarea",
              placeholder: "Enter your project description",
            },
            {
              id: "budget",
              label: "Budget",
              value: projectBudget,
              onChange: setProjectBudget,
              type: "number",
              placeholder: "Enter your budget",
            },
            {
              id: "deadline",
              label: "Deadline",
              value: projectDeadline,
              onChange: setProjectDeadline,
              type: "date",
            },
            {
              id: "email",
              label: "Your Email",
              value: contactEmail,
              onChange: setContactEmail,
              type: "email",
              placeholder: "Enter your email",
            },
          ].map(({ id, label, ...inputProps }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
              >
                {label}
              </label>
              {inputProps.type === "textarea" ? (
                <textarea
                  id={id}
                  {...inputProps}
                  rows="4"
                  className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
                />
              ) : (
                <input
                  id={id}
                  {...inputProps}
                  className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
                />
              )}
            </div>
          ))}

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
              Attach Files
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={(e) => setFileUpload(e.target.files[0])}
              className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ADA9]"
            />
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
