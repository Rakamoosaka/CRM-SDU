import React from "react";

const AdminPage = () => {
  return (
    <div className="bg-[#1c1e26] min-h-screen text-white">
      {/* Header */}
      <header className="p-4 bg-[#2a2d38] flex justify-between items-center">
        <h1 className="text-2xl font-bold">SDU IT PARK</h1>
        <button className="bg-[#33ADA9] hover:bg-teal-600 text-white px-4 py-2 rounded">
          Log Out
        </button>
      </header>

      {/* Filters Section */}
      <section className="p-4 flex justify-center">
        <div className=" p-4 rounded-md flex flex-wrap gap-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="keyword" className="text-base font-medium">
              Поиск по ключевым словам:
            </label>
            <input
              id="keyword"
              type="text"
              placeholder="Введите ключевые слова..."
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="status" className="text-base font-medium">
              Фильтр по статусу:
            </label>
            <select
              id="status"
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
            >
              <option>Все</option>
              <option>Новые</option>
              <option>В ожидании</option>
              <option>Принятые</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-base font-medium">
              Категория:
            </label>
            <select
              id="category"
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
            >
              <option>Все</option>
              <option>Web Development</option>
              <option>Mobile Apps</option>
              <option>Data Science</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sort" className="text-base font-medium">
              Сортировать по:
            </label>
            <select
              id="sort"
              className="p-2 rounded bg-[#2a2d38] border border-gray-600 focus:outline-none"
            >
              <option>Дата (новые сверху)</option>
              <option>Дата (старые сверху)</option>
            </select>
          </div>
          <button className="bg-[#33ADA9] hover:bg-teal-600 text-white px-4 py-2 rounded mt-4 sm:mt-0">
            Применить
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="p-4 flex justify-center">
        <div className="w-7/12 bg-[#2a2d38] p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Проекты</h2>
          <div className="space-y-3">
            {/* Project Card */}
            <div className="bg-[#3a3f51] p-4 rounded-md">
              <h3 className="text-xl font-bold mb-2">Web App for E-Commerce</h3>
              <p className="text-sm mb-2">Категория: Web Development</p>
              <p className="text-sm mb-2">Статус: Новые</p>
            </div>
            <div className="bg-[#3a3f51] p-4 rounded-md">
              <h3 className="text-xl font-bold mb-2">
                Mobile App for Task Management
              </h3>
              <p className="text-sm mb-2">Категория: Mobile Apps</p>
              <p className="text-sm mb-2">Статус: В ожидании</p>
            </div>
            <div className="bg-[#3a3f51] p-4 rounded-md">
              <h3 className="text-xl font-bold mb-2">
                Data Analytics Dashboard
              </h3>
              <p className="text-sm mb-2">Категория: Data Science</p>
              <p className="text-sm mb-2">Статус: Принятые</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
