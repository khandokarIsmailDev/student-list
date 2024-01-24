/*
 => Creating API for single addStudent registration. (POST) (done)
 => Creating API to delete a single addStudent. (DELETE) (done)
 => API needs to be created to update addStudent information. (PUT) (done)
 => API should be created to get all students together. (GET) (done)
*/

import prisma from "@/libs/Prisma";
import StudentDataValidate from "@/utility/StudentValidation";
import { NextResponse } from "next/server";


// get all users
export async function GET(req, res) {
  try {
    const result = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Users fetched successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "An error occured while fetching users",data:error.message},
      { status: 500 }
    );
  }
}


// single user registration
export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    let errors = await StudentDataValidate(reqBody);
    if (errors) {
      return NextResponse.json(
        { status: "fail", message: errors },
        { status: 400 }
      );
    }
    const result = await prisma.user.create({
      data: reqBody,
    });
    return NextResponse.json(
      { status: "success", message: "User created successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "An error occured while creating user" },
      { status: 500 }
    );
  }
}

// update a single user
export async function PUT(req, res) {
  try {
    let reqBody = await req.json();
    reqBody["age"] = parseInt(reqBody["age"]);

    const { searchParams } = new URL(req.nextUrl);
    const id = Number(searchParams.get("id"));

    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: reqBody,
    });
    return NextResponse.json(
      { status: "success", message: "User updated successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "An error occured while updating user" },
      { status: 500 }
    );
  }
}

// delete a single user
export async function DELETE(req, res) {
  try {
    const { searchParams } = new URL(req.nextUrl);
    const id = Number(searchParams.get("id"));

    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { status: "success", message: "User deleted successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "An error occured while deleting user",data:error.message },
      { status: 500 }
    );
  }
}
