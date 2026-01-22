import Link from "next/link"
import { cn } from "@/lib/utils"

interface Category {
  name: string
  slug: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={category.slug === "tumu" ? "/urunler" : `/urunler?kategori=${category.slug}`}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeCategory === category.slug
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
