import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Heart, Target, Users, Award, Zap, MapPin, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "24/7", label: "Protection Available" },
  { value: "< 2s", label: "Alert Response Time" },
  { value: "100%", label: "Privacy Guaranteed" },
  { value: "3+", label: "Emergency Contacts" }
]

const values = [
  {
    icon: Heart,
    title: "Safety First",
    description: "Your safety is our primary concern. Every feature is designed with protection in mind."
  },
  {
    icon: Target,
    title: "Reliability",
    description: "Fail-safe systems ensure your alerts reach emergency contacts even in challenging conditions."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a network of protection for women and children across communities."
  },
  {
    icon: Award,
    title: "Privacy",
    description: "Your data is encrypted and secure. We never share information without consent."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">About SafeGuard</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Empowering Safety Through Technology
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              SafeGuard was created with a singular mission: to provide women and children 
              with reliable, instant access to safety tools when they need them most.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We believe that everyone deserves to feel safe. Women and children face 
                  unique safety challenges, and traditional emergency response systems 
                  often fall short in providing immediate assistance.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  SafeGuard bridges this gap by putting powerful safety tools directly in 
                  your hands. With features like instant SOS alerts, real-time GPS tracking, 
                  and automatic emergency notifications, help is always just one tap away.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our technology is designed to be simple, reliable, and accessible to 
                  everyone, regardless of technical expertise.
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-8 border border-border card-soft">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A world where every woman and child can move freely without fear, 
                  knowing that help is always within reach.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Instant Alerts</p>
                      <p className="text-sm text-muted-foreground">Sent in under 2 seconds</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Live Location</p>
                      <p className="text-sm text-muted-foreground">Real-time GPS tracking</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Fast Response</p>
                      <p className="text-sm text-muted-foreground">Multiple notification channels</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at SafeGuard
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors card-soft"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join the SafeGuard Community
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Take the first step towards enhanced personal safety. 
              Register today and start protecting yourself and your loved ones.
            </p>
            <Link href="/register">
              <Button size="lg" className="text-base px-10 py-6 rounded-xl">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
