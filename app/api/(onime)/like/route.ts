import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// export const runtime = "edge";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("post_id");

  if (!post_id) return NextResponse.error();

  const love = await prisma.love.findUnique({
    where: { post_id },
  });

  return NextResponse.json(love?.count || 0);
}

export async function POST(req: Request): Promise<Response> {
  const { post_id } = await req.json();

  await prisma.love.upsert({
    where: { post_id },
    update: { count: { increment: 1 } },
    create: {
      post_id: post_id,
      count: 1,
    },
  });

  return NextResponse.json("ok");
}

export async function DELETE(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("post_id");

  if (!post_id) return NextResponse.error();

  await prisma.love.update({
    where: { post_id },
    data: { count: { decrement: 1 } },
  });

  return NextResponse.json("ok");
}

// fetch('https://oaii.vercel.app/api/comment', {
//   method: 'post', body: JSON.stringify({
//     username: 'a11', mail: 'no@mail.com', content: 'hello world', post_id: '0'
//   })
// })

// curl 'https://oaii.vercel.app/api/comment' \
//   -H 'sec-ch-ua: "Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'Referer;' \
//   -H 'DNT: 1' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' \
//   -H 'Content-Type: text/plain;charset=UTF-8' \
//   --data-raw '{"username":"a11","mail":"no@mail.com","content":"hello world","post_id":"0"}' \
//   --compressed
