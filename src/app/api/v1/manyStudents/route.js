/*
 => Create API for registering many students at once. (POST) (done)
=> An API needs to be created to show the data of a single addStudent. (GET) (done)
*/

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// get a single addStudent data by id
export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.nextUrl);
    const id = Number(searchParams.get("id"));

    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "User fetched successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "An error occured while fetching user" },
      { status: 500 }
    );
  }
}

// many students registration
export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const result = await prisma.user.createMany({
      data: reqBody,
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Students created successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "An error occured while creating students" },
      { status: 500 }
    );
  }
}
