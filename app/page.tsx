import Link from "next/link"
import { Shield, Zap, MapPin, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  Your Safety, Our Priority
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Stay Safe, <br />
                  <span className="text-primary">Stay Protected</span>
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  A real-time emergency safety platform designed for women and children. 
                  Instant SOS alerts, live GPS tracking, and emergency contact notifications 
                  when you need them most.
                </p>
                
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  &quot;Your safety is always a priority.&quot;
                </blockquote>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-xl">
                      Start Safety Setup
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-xl">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right - Illustration */}
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Background circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full bg-secondary/50" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full bg-primary/10" />
                  </div>
                  
                  {/* Shield Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30">
                      <Shield className="w-20 h-20 text-primary-foreground" />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-10 right-10 p-3 rounded-xl bg-card shadow-lg card-soft">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="absolute bottom-20 left-5 p-3 rounded-xl bg-card shadow-lg card-soft">
                    <MapPin className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="absolute top-1/3 left-0 p-3 rounded-xl bg-card shadow-lg card-soft">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple, fast, and reliable emergency response in three easy steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Alert",
                  description: "Press the SOS button to immediately alert your emergency contacts with your location",
                  step: "01"
                },
                {
                  icon: MapPin,
                  title: "Live Location",
                  description: "Your real-time GPS coordinates are shared continuously during an emergency",
                  step: "02"
                },
                {
                  icon: Bell,
                  title: "Fast Response",
                  description: "Emergency contacts receive instant notifications to respond quickly",
                  step: "03"
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="relative p-8 rounded-2xl bg-card shadow-lg card-soft"
                >
                  <span className="absolute top-4 right-4 text-6xl font-bold text-secondary">
                    {feature.step}
                  </span>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Feel Safer?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of users who trust SafeGuard for their personal safety. 
              Setup takes less than 2 minutes.
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
