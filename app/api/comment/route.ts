
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const { username, mail, site, content, post_id } = await req.json()

  const created = await prisma.comment.create({
    data: { username, mail, site, content, post_id }
  })

  return NextResponse.json(created)
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const comments = await prisma.comment.findMany({
    where: { post_id: searchParams.get('post_id') }
  })

  return NextResponse.json(comments)
}
