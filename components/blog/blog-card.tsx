import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Oku
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
