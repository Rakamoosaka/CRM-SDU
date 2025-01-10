import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

const AdminPage = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    ordering: "-created_at",
  });
  const [activeFilters, setActiveFilters] = useState({ ...filters });
  const [selectedProject, setSelectedProject] = useState(null);
  const [comment, setComment] = useState("");

  // Handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const params = {
        search: activeFilters.search || undefined,
        status: activeFilters.status || undefined,
        category__name__icontains: activeFilters.category || undefined,
        ordering: activeFilters.ordering || undefined,
      };
      const response = await axiosInstance.get("/projects/", { params });
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  // Accept project
  const acceptProject = async () => {
    if (!selectedProject) return;

    try {
      const response = await axiosInstance.post(
        `/projects/${selectedProject.id}/accept/`
      );
      console.log(response.data);
      fetchProjects(); // Refresh project list
      setSelectedProject(null); // Close modal
    } catch (error) {
      console.error("Failed to accept project:", error);
    }
  };

  // Reject project
  const rejectProject = async () => {
    if (!selectedProject) return;

    try {
      const response = await axiosInstance.post(
        `/projects/${selectedProject.id}/reject/`
      );
      console.log(response.data);
      fetchProjects(); // Refresh project list
      setSelectedProject(null); // Close modal
    } catch (error) {
      console.error("Failed to reject project:", error);
    }
  };

  // Post comment
  const postComment = async () => {
    if (!selectedProject || !comment) return;

    try {
      const response = await axiosInstance.post("/comments/", {
        project: selectedProject.id,
        comment_text: comment,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch projects when activeFilters change
  useEffect(() => {
    fetchProjects();
  }, [activeFilters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    setActiveFilters({ ...filters });
  };

  // Open modal with selected project details
  const openModal = (project) => {
    setSelectedProject(project);
    setComment("");
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-[#1c1e26] min-h-screen text-white">
      {/* Header */}
      <header className="bg-[#2a2d38] py-4 px-10 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl text-white font-bold">SDU IT PARK</h1>
        </Link>
        <button
          className="bg-[#33ADA9] hover:bg-teal-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </header>

      {/* Filters Section */}
      <section className="p-4 flex justify-center">
        <div className="p-4 rounded-md flex flex-wrap gap-4 items-center">
          {/* Search Filter */}
          <div className="flex flex-col">
            <label htmlFor="search" className="text-base font-medium">
              Search by keywords:
            </label>
            <input
              id="search"
              type="text"
              placeholder="Enter keywords..."
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-base font-medium">
              Filter by status:
            </label>
            <select
              id="status"
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="NEW">New</option>
              <option value="REJECTED">Rejected</option>
              <option value="ACCEPTED">Accepted</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-base font-medium">
              Category:
            </label>
            <select
              id="category"
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by Date Filter */}
          <div className="flex flex-col">
            <label htmlFor="ordering" className="text-base font-medium">
              Sort by Date:
            </label>
            <select
              id="ordering"
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
              value={filters.ordering}
              onChange={handleFilterChange}
            >
              <option value="-created_at">Date (Newest first)</option>
              <option value="created_at">Date (Oldest first)</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <button
            className="bg-[#33ADA9] hover:bg-teal-600 text-white mt-6 px-4 py-2 rounded"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="p-4 flex justify-center">
        <div className="w-7/12 bg-[#2a2d38] p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={openModal}
                />
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        comment={comment}
        onCommentChange={setComment}
        onClose={closeModal}
        onAccept={() => {
          acceptProject();
          postComment(); // Post comment when accepting
        }}
        onReject={() => {
          rejectProject();
          postComment(); // Post comment when rejecting
        }}
      />
    </div>
  );
};

export default AdminPage;
