
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
