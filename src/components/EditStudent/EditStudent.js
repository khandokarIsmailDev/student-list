"use client";
import React, {useEffect, useState} from 'react';
import toast, {Toaster} from "react-hot-toast";
import Loader from "@/utility/Loader";
import {useSearchParams} from "next/navigation";
import  {useRouter} from "next/navigation";

const EditStudent = () => {
    const router = useRouter();
    const params = useSearchParams();
    const id = params.get("id");
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({});

    useEffect(() => {
        const getStudentData = async () => {
            try {
                const res = await fetch(`/api/v1/manyStudents?id=${id}`);
                const data = await res.json();
                setStudent(data.data);
            } catch (e) {
                console.log(e)
            }
        }
        getStudentData().then(r => r);
    }, [id])
    const editStudent = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const reqBody = Object.fromEntries(formData);
        const res = await fetch(`/api/v1/user?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.status === "success") {
            setLoading(false);
            toast.success(data.message);
        } else {
            setLoading(false);
        }
    }


    return (
        <div className="w-full px-2 md:w-3/4 mx-auto py-10">
            <h1 className="text-center text-xl font-bold mb-10">
                Edit <span className="text-blue-600">Student</span>
            </h1>
            <Toaster position="top-right"
                     reverseOrder={false}
            />
            <form
                className="w-full md:w-1/2 mx-auto shadow-lg rounded p-4 border"
                onSubmit={editStudent}
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
                            defaultValue={student?.first_name}
                        />

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
                            defaultValue={student?.last_name}
                        />

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
                            defaultValue={student?.age}
                        />

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
                            defaultValue={student?.grade}
                        />

                    </div>
                </div>

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
                        <option value="Nextjs" selected={student?.courses === "Nextjs"}>Nextjs</option>
                        <option value="Reactjs" selected={student?.courses === "Reactjs"}>Reactjs</option>
                        <option value="Nodejs" selected={student?.courses === "Nodejs"}>Nodejs</option>
                    </select>

                </div>

                <div className="px-3">
                    <button
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit">
                        {loading ? <Loader/> : "Update Student"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;