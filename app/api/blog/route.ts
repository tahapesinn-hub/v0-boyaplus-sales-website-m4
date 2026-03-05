import { NextResponse } from "next/server"
import { blogPosts } from "@/lib/blog-data"

export async function GET() {
  const posts = blogPosts.map(({ content, ...rest }) => rest)
  return NextResponse.json(posts)
}
