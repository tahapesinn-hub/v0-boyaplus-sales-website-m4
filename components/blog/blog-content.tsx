import type { BlogSection } from "@/lib/blog-data"

interface BlogContentProps {
  sections: BlogSection[]
}

export function BlogContent({ sections }: BlogContentProps) {
  return (
    <div className="prose-custom space-y-6">
      {sections.map((section, i) => {
        switch (section.type) {
          case "h2":
            return (
              <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">
                {section.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={i} className="text-xl font-semibold text-foreground mt-8 mb-3">
                {section.text}
              </h3>
            )
          case "p":
            return (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {section.text}
              </p>
            )
          case "list":
            return (
              <ul key={i} className="space-y-2 ml-4">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case "tip":
            return (
              <div key={i} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Profesyonel Ipucu</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
