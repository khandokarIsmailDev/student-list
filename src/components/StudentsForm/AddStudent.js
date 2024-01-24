"use client";

import Loader from "@/utility/Loader";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const addStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const data = {};
    form.forEach((value, key) => (data[key] = value));
    data["age"] = parseInt(data["age"]);
    const res = await fetch("/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status === "success") {
      toast.success(result.message);
      e.target.reset();
      setLoading(false);
    } else {
      if (result.message) {
        setError(result.message);
      }
      setLoading(false);
    }
  };
  return (
    <div className="w-full px-2 md:w-3/4 mx-auto py-10">
      <h1 className="text-center text-xl font-bold mb-10">
        Add <span className="text-blue-600">Student</span>
      </h1>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        className="w-full md:w-1/2 mx-auto shadow-lg rounded p-4 border"
        onSubmit={addStudent}
      >
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              name="first_name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
            {error[0]?.path[0] === "first_name" && (
              <p className="text-red-600 text-xs italic">{error[0].message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              name="last_name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
            {error[1]?.path[0] === "last_name" && (
              <p className="text-red-600 text-xs italic">{error[1].message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-age"
            >
              Age <span className="text-red-600">*</span>
            </label>
            <input
              name="age"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-age"
              type="number"
              placeholder="30"
            />
            {error[2]?.path[0] === "age" && (
              <p className="text-red-600 text-xs italic">{error[2].message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-grade"
            >
              Grade <span className="text-red-600">*</span>
            </label>
            <input
              name="grade"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-grade"
              type="text"
              placeholder="A+"
            />
            {error[3]?.path[0] === "grade" && (
              <p className="text-red-600 text-xs italic">{error[3].message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-courses"
            >
              Courses <span className="text-red-600">*</span>
            </label>
            <select
              name="courses"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-courses"
            >
              <option value="">Select Course</option>
              <option value="Nextjs">Nextjs</option>
              <option value="Reactjs">Reactjs</option>
              <option value="Nodejs">Nodejs</option>
            </select>
            {error[4]?.path[0] === "courses" && (
              <p className="text-red-600 text-xs italic">{error[4].message}</p>
            )}
          </div>
        </div>
        <div className="px-3">
          <button
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            {loading ? <Loader /> : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
