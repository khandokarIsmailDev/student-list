/* eslint-disable @next/next/no-async-client-component */
'use client'
import DeleteBtn from "@/utility/DeleteBtn";
import Link from "next/link";
import { useEffect, useState } from "react";
import {getStudentData} from "./fetchData"
import toast from "react-hot-toast";


const StudentList =  () => {
  const [studentData,setStudentData] = useState([])


console.log(studentData)

useEffect(()=>{
  let ignore = false;
  async function allData(){
    const fetchData = await getStudentData()
    if(!ignore){
      setStudentData([...fetchData])
    }

    return () =>{
      ignore=true
    }
    
  }

  allData()
},[])


async function handleDelete(studentId){
  // console.log(studentId)
  try {
    let confirm = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirm) {
      const res = await fetch(`/api/v1/user?id=${studentId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data["status"] === "success") {
        toast.success(data["message"])
      } else {
        toast.error(data["message"]);
      }

      let deleteStudent = studentData.filter(student => student.id !== studentId) 
      setStudentData(deleteStudent)

    }
  } catch (e) {
    toast.error(e);
  }
}




  return (
    <div className="relative overflow-x-auto py-10">
      <h1 className="text-center font-bold text-xl mb-4">
        Student <span className="text-blue-600">List</span>
      </h1>
      <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SN
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Age
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
            <th scope="col" className="px-6 py-3">
              Course
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {  studentData?.map((student, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {student["first_name"] + " " + student["last_name"]}
              </th>
              <td className="px-6 py-4">{student["age"]}</td>
              <td className="px-6 py-4">{student["grade"]}</td>
              <td className="px-6 py-4">{student["courses"]}</td>
              <td className="px-6 py-4">
                <Link
                  href={{
                    pathname: "/editStudent",
                    query: { id: student["id"] },
                  }}
                  className="bg-indigo-100 px-2 py-2 rounded"
                >
                  edit
                </Link>
                &nbsp;
                <Link href="#" className="bg-red-100 px-2 py-2 rounded">
                  {/* <DeleteBtn id={student["id"]} /> */}
                  <button
                    onClick={()=>handleDelete(student['id'])}
                  >
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
