import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const AdminPage = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login"); // Redirect to login
    }
  };

  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    ordering: "-created_at", // Default: Newest first
  });

  // Fetch projects when filters change
  const fetchProjects = async () => {
    try {
      const params = {
        search: filters.search || undefined,
        status: filters.status || undefined,
        category: filters.category || undefined,
        ordering: filters.ordering || undefined,
      };

      const response = await axiosInstance.get("/projects/", { params });
      setProjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  // Use useEffect to call fetchProjects whenever filters change
  useEffect(() => {
    fetchProjects();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
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
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
            </select>
          </div>
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
              <option value="1">Web Development</option>
              <option value="2">Mobile Apps</option>
              <option value="3">Data Science</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="ordering" className="text-base font-medium">
              Sort by:
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
          <button
            className="bg-[#33ADA9] hover:bg-teal-600 text-white mt-6 px-4 py-2 rounded"
            onClick={() => fetchProjects()} // Trigger re-fetch
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
      <div key={project.id} className="bg-[#3a3f51] p-4 rounded-md">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-base mb-2">
  <span className="font-semibold">Category:</span>{" "}
  <span className="font-normal">{project.category?.name || "N/A"}</span>
</p>

        <p className="text-base mb-2">
  <span className="font-semibold">Status:</span> <span className="font-normal">{project.status}</span>
</p>
      </div>
    ))
  ) : (
    <p>No projects found.</p>
  )}
</div>


        </div>
      </section>
    </div>
  );
};

export default AdminPage;
