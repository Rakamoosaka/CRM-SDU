import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosDefault from "../axiosDefault";
import Footer from "../components/Footer";

const SubmissionPage = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [fileUploads, setFileUploads] = useState([]);
  const [projectCategory, setProjectCategory] = useState("");
  const [senderName, setSenderName] = useState("");

  // NEW: Priority state
  const [projectPriority, setProjectPriority] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Character limits
  const CHAR_LIMITS = {
    senderName: 30,
    projectTitle: 30,
    projectDescription: 1000,
  };

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
    const files = Array.from(e.target.files);
    if (files.length + fileUploads.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }
    setFileUploads((prev) => [...prev, ...files]);
  };

  const removeFile = (indexToRemove) => {
    setFileUploads((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (
      !projectCategory ||
      !projectTitle ||
      !projectDescription ||
      !contactEmail ||
      !senderName ||
      !projectPriority
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

    // File validations
    const validTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of fileUploads) {
      if (!validTypes.includes(file.type)) {
        alert("Only PDF, JPEG, PNG, DOC, DOCX, or TXT files are allowed.");
        return;
      }
      if (file.size > maxSize) {
        alert("Each file size must be less than 5MB.");
        return;
      }
    }

    setLoading(true);

    try {
      // IMPORTANT: Pass the priority to the backend
      const projectResponse = await axiosDefault.post("/projects/", {
        title: projectTitle,
        description: projectDescription,
        budget: parseFloat(projectBudget) || null,
        deadline: projectDeadline,
        sender_name: senderName,
        contact_email: contactEmail,
        category:
          categories.find((c) => c.name === projectCategory)?.id || null,
        // NEW: Priority
        priority: projectPriority,
      });

      const projectId = projectResponse.data.id;

      // Upload files
      for (const file of fileUploads) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("project", projectId);

        await axiosDefault.post("/attachments/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting project proposal:", error);
      alert("Failed to submit the project proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1e26] flex flex-col items-center px-4 py-6">
      <header className="w-full bg-[#2a2d38] py-4 px-6 sm:px-10 rounded-lg shadow-md">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl text-white font-bold">
            SDU IT PARK
          </h1>
        </Link>
      </header>

      {!isSubmitted ? (
        <div className="w-full max-w-md sm:max-w-lg bg-[#2a2d38] p-6 sm:p-8 rounded-lg shadow-lg mt-8">
          <h2 className="text-white text-lg sm:text-xl font-bold text-center mb-6">
            Submit Your Project Proposal
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
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
                onChange={(e) =>
                  setSenderName(e.target.value.slice(0, CHAR_LIMITS.senderName))
                }
                maxLength={CHAR_LIMITS.senderName}
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9] 
                           transition-all duration-200"
              />
            </div>

            {/* Title */}
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
                onChange={(e) =>
                  setProjectTitle(
                    e.target.value.slice(0, CHAR_LIMITS.projectTitle)
                  )
                }
                maxLength={CHAR_LIMITS.projectTitle}
                placeholder="Enter your project title"
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9] 
                           transition-all duration-200"
              />
            </div>

            {/* Description */}
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
                onChange={(e) =>
                  setProjectDescription(
                    e.target.value.slice(0, CHAR_LIMITS.projectDescription)
                  )
                }
                maxLength={CHAR_LIMITS.projectDescription}
                placeholder="Enter your project description"
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9] 
                           transition-all duration-200"
                rows="4"
              />
              <p className="text-gray-400 text-xs text-right">
                {projectDescription.length}/{CHAR_LIMITS.projectDescription}{" "}
                characters
              </p>
            </div>

            {/* Budget */}
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
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                           transition-all duration-200"
              />
            </div>

            {/* Deadline */}
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
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                           transition-all duration-200"
              />
            </div>

            {/* Email */}
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
                onChange={(e) => setContactEmail(e.target.value.slice(0, 35))}
                maxLength={35}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                           transition-all duration-200"
              />
            </div>

            {/* Category */}
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
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                           transition-all duration-200"
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

            {/* NEW: Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-gray-300 text-sm sm:text-base font-medium mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                value={projectPriority}
                onChange={(e) => setProjectPriority(e.target.value)}
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                           transition-all duration-200"
              >
                <option value="" disabled>
                  Select a Priority
                </option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
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
                className="w-full px-3 py-2 bg-[#1c1e26] text-white rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                           transition-all duration-200"
              />
              <ul className="mt-2 text-gray-400 text-sm">
                {fileUploads.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-600 py-1"
                  >
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:underline"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-[#33ADA9] text-white font-bold rounded-md 
                         hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500
                         transition-colors duration-200"
              disabled={loading || loadingCategories}
            >
              {loading ? "Submitting..." : "Submit Proposal"}
            </button>
          </form>
        </div>
      ) : (
        // SUCCESS SECTION
        <div className="w-full max-w-md sm:max-w-lg bg-[#2a2d38] p-6 sm:p-8 rounded-lg shadow-lg mt-8 flex flex-col items-center">
          <h2 className="text-2xl text-white font-bold mb-4">
            Thank You For Your Submission!
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Check your email box for incoming letters.
          </p>
          <Link
            to="/"
            className="inline-block px-5 py-2 bg-[#33ADA9] text-white rounded-md font-semibold 
                       hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500
                       transition-colors duration-200"
          >
            Return to Home
          </Link>
        </div>
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SubmissionPage;
