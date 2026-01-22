import { Shield, Droplets, Leaf, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Uzun Ömürlü Koruma",
    description: "Gelişmiş formülümüz ile yüzeyler yıllarca korunur ve ilk günkü tazeliğini korur.",
  },
  {
    icon: Droplets,
    title: "Su Bazlı Formül",
    description: "Çevre dostu su bazlı boyalarımız koku yapmaz ve sağlığınızı düşünür.",
  },
  {
    icon: Leaf,
    title: "Çevre Dostu",
    description: "Düşük VOC içerikli ürünlerimiz hem size hem doğaya zarar vermez.",
  },
  {
    icon: Award,
    title: "Premium Kalite",
    description: "25 yıllık tecrübemiz ve kalite belgelerimizle güvenilir hizmet sunuyoruz.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            Neden Boyaplus?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Kalite ve Güvenin Adresi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Premium kalite ürünlerimiz ve profesyonel desteğimizle projelerinizde yanınızdayız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
