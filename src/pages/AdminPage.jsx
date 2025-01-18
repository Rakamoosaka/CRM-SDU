import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import LogsModal from "../components/LogsModal";
import Footer from "../components/Footer";

const AdminPage = () => {
  const navigate = useNavigate();

  /// Toggle state for "All Projects" and "My Projects"
  const [viewMyProjects, setViewMyProjects] = useState(false);

  // Projects & Categories
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  // Loading & Error states
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");

  // Logs
  const [logs, setLogs] = useState([]);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logsError, setLogsError] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    priority: "",
    ordering: "-created_at",
  });
  const [activeFilters, setActiveFilters] = useState({ ...filters });

  // Project Modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [comment, setComment] = useState("");

  // Accept/Reject/Start/Complete loading state
  // "accept" | "reject" | "start" | "complete" | null
  const [actionLoading, setActionLoading] = useState(null);

  // ------------------- LOGOUT -------------------
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  // ------------------- FETCH CATEGORIES -------------------
  const fetchCategories = async () => {
    setLoadingCategories(true);
    setCategoriesError("");
    try {
      const response = await axiosInstance.get("/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategoriesError("Failed to load categories. Please try again later.");
    } finally {
      setLoadingCategories(false);
    }
  };

  // ------------------- FETCH PROJECTS -------------------
  // ------------------- FETCH PROJECTS -------------------
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setProjectsError("");

    try {
      const endpoint = viewMyProjects ? `/user/my-projects/` : "/projects/";

      const params = {
        search: activeFilters.search || undefined,
        status: activeFilters.status || undefined,
        category__name__icontains: activeFilters.category || undefined,
        priority: activeFilters.priority || undefined,
        ordering: activeFilters.ordering || undefined,
      };
      console.log(params);

      const response = await axiosInstance.get(endpoint, { params });
      setProjects(response.data.projects || response.data);
      console.log(projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjectsError("Failed to load projects. Please try again later.");
    } finally {
      setLoadingProjects(false);
    }
  };

  // ------------------- ACCEPT PROJECT -------------------
  const acceptProject = async () => {
    if (!selectedProject) return;
    setActionLoading("accept");
    try {
      await axiosInstance.post(`/projects/${selectedProject.id}/accept/`, {
        comment_text: comment,
      });
      fetchProjects();
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to accept project:", error);
      alert("Failed to accept project. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // ------------------- REJECT PROJECT -------------------
  const rejectProject = async () => {
    if (!selectedProject) return;
    setActionLoading("reject");
    try {
      await axiosInstance.post(`/projects/${selectedProject.id}/reject/`, {
        comment_text: comment,
      });
      fetchProjects();
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to reject project:", error);
      alert("Failed to reject project. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // ------------------- START PROJECT -------------------
  const startProject = async () => {
    if (!selectedProject) return;
    setActionLoading("start");
    try {
      await axiosInstance.post(`/projects/${selectedProject.id}/start/`);
      fetchProjects();
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to start project:", error);
      alert("Failed to start project. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // ------------------- COMPLETE PROJECT -------------------
  const completeProject = async () => {
    if (!selectedProject) return;
    setActionLoading("complete");
    try {
      await axiosInstance.post(`/projects/${selectedProject.id}/completed/`);
      fetchProjects();
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to complete project:", error);
      alert("Failed to complete project. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // ------------------- FETCH LOGS -------------------
  const fetchLogs = async () => {
    setLogsError("");
    setLoadingLogs(true);
    try {
      const response = await axiosInstance.get("/logs/");
      setLogs(response.data.results || []);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      setLogsError("Failed to load logs. Please try again later.");
    } finally {
      setLoadingLogs(false);
    }
  };

  const openLogsModal = () => {
    setIsLogsModalOpen(true);
    fetchLogs();
  };

  const closeLogsModal = () => {
    setIsLogsModalOpen(false);
  };

  // ------------------- useEffect -------------------
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters, viewMyProjects]);

  // ------------------- FILTERS -------------------
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const applyFilters = () => {
    setActiveFilters({ ...filters });
  };

  // ------------------- MODAL OPEN/CLOSE -------------------
  const openModal = (project) => {
    setSelectedProject(project);
    setComment("");
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // ------------------- RENDER -------------------
  return (
    <div className="bg-[#1c1e26] min-h-screen text-white px-4 py-6 leading-relaxed">
      {/* Header */}
      <header className="bg-[#2a2d38] py-4 px-6 sm:px-10 flex justify-between items-center rounded-lg shadow-md">
        <Link to="/">
          <h1 className="text-lg sm:text-2xl font-bold text-white">
            SDU IT PARK
          </h1>
        </Link>
        <div className="flex gap-2">
          <button
            className="bg-[#33ADA9] hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded transition-colors duration-200"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded transition-colors duration-200"
            onClick={openLogsModal}
          >
            Logs
          </button>
        </div>
      </header>

      {/* Filters Section */}
      <section className="px-4 py-6 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4">
        {/* Search Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="search"
            className="text-base font-medium text-gray-300 mb-1"
          >
            Search:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Enter keywords..."
            className="p-2 rounded bg-[#2a2d38] border border-gray-600 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-[#33ADA9] transition-all duration-200"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="text-base font-medium text-gray-300 mb-1"
          >
            Status:
          </label>
          <select
            id="status"
            className="p-2 rounded bg-[#2a2d38] border border-gray-600 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-[#33ADA9] transition-all duration-200"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="NEW">NEW</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-base font-medium text-gray-300 mb-1"
          >
            Category:
          </label>
          <select
            id="category"
            className="p-2 rounded bg-[#2a2d38] border border-gray-600 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-[#33ADA9] transition-all duration-200"
            value={filters.category}
            onChange={handleFilterChange}
            disabled={loadingCategories}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {categoriesError && (
            <p className="text-red-400 text-sm mt-1">{categoriesError}</p>
          )}
        </div>

        {/* Priority Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="priority"
            className="text-base font-medium text-gray-300 mb-1"
          >
            Priority:
          </label>
          <select
            id="priority"
            className="p-2 rounded bg-[#2a2d38] border border-gray-600 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-[#33ADA9] transition-all duration-200"
            value={filters.priority}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        {/* Sort by Date Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="ordering"
            className="text-base font-medium text-gray-300 mb-1"
          >
            Sort by Date:
          </label>
          <select
            id="ordering"
            className="p-2 rounded bg-[#2a2d38] border border-gray-600 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-[#33ADA9] transition-all duration-200"
            value={filters.ordering}
            onChange={handleFilterChange}
          >
            <option value="-created_at">Newest first</option>
            <option value="created_at">Oldest first</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <button
          className="bg-[#33ADA9] hover:bg-teal-600 text-white px-4 py-2 rounded text-base 
                     mt-4 sm:mt-0 self-start sm:self-center transition-colors duration-200"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </section>

      {/* Projects Section */}
      <section className="px-4 pb-6 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-[#2a2d38] p-6 rounded-lg shadow-md">
          <div className="flex bg-[#3A3F51] rounded-full p-1 max-w-[40%] mb-4">
            <button
              onClick={() => setViewMyProjects(false)}
              className={`flex-1 py-2 text-xl font-semibold rounded-full ${
                viewMyProjects === false
                  ? "bg-[#53596F] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setViewMyProjects(true)}
              className={`flex-1 py-2 text-xl font-semibold rounded-full ${
                viewMyProjects === true
                  ? "bg-[#53596F] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Projects
            </button>
          </div>
          {loadingProjects ? (
            <p className="text-gray-300">Loading projects...</p>
          ) : projectsError ? (
            <p className="text-red-400">{projectsError}</p>
          ) : projects.length > 0 ? (
            // Vertical layout: one card after another
            <div className="space-y-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={openModal}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-300">No projects found.</p>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        comment={comment}
        onCommentChange={setComment}
        onClose={closeModal}
        onAccept={acceptProject}
        onReject={rejectProject}
        onStart={startProject}
        onComplete={completeProject}
        actionLoading={actionLoading}
      />

      {/* Logs Modal */}
      <LogsModal
        open={isLogsModalOpen}
        logs={logs}
        onClose={closeLogsModal}
        loading={loadingLogs}
        error={logsError}
      />

      <Footer />
    </div>
  );
};

export default AdminPage;
