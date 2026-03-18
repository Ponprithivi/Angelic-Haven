"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Mail, Send, CheckCircle, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const quotes = [
  "You are never alone.",
  "Help is always within reach.",
  "Stay strong, stay safe."
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-6">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">Contact Us</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Get in Touch
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or need support? We&apos;re here to help you feel safe and secure.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Form Only */}
              <div className="bg-card rounded-2xl p-8 border border-border card-soft">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 rounded-full bg-primary/10 mb-4">
                      <CheckCircle className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="rounded-xl"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 rounded-xl bg-background border-border"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 rounded-xl bg-background border-border"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-32 rounded-xl bg-background border-border resize-none"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 rounded-xl text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Right Side - Quotes & Illustration */}
              <div className="flex flex-col gap-8">
                {/* Illustration Area */}
                <div className="relative bg-secondary/30 rounded-2xl p-8 flex items-center justify-center min-h-64">
                  <div className="relative">
                    {/* Background circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-primary/10" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-36 h-36 rounded-full bg-primary/20" />
                    </div>
                    
                    {/* Shield Icon */}
                    <div className="relative w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                      <Shield className="w-12 h-12 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Quotes */}
                <div className="space-y-4">
                  {quotes.map((quote, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border card-soft"
                    >
                      <div className="p-2 rounded-xl bg-primary/10">
                        <Quote className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-foreground font-medium italic text-lg">
                        &ldquo;{quote}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Emergency Contact */}
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-3">
                    In an Emergency?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you&apos;re in immediate danger, please call emergency services right away.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="tel:112"
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
                    >
                      Call 112
                    </a>
                    <a 
                      href="tel:100"
                      className="inline-flex items-center justify-center px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-xl transition-colors"
                    >
                      Police: 100
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
