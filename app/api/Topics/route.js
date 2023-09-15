import connectMongoDB from "@/libs/mongodb";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("in post route");

    const { codigo, rating, comentario,name } = await request.json();
    console.log("Received Data:", codigo, rating, comentario,name);

    await connectMongoDB();

    const createdComment = await Comment.create({ codigo, rating, comentario,name });
    console.log("Comment Created:", createdComment);

    return NextResponse.json({ message: "Comment Created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const comments = await Comment.find();
  return NextResponse.json({ comments });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Comment.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}