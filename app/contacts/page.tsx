"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, Trash2, Plus, Save } from "lucide-react"

interface Contact {
  name: string
  phone: string
}

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "", phone: "" },
    { name: "", phone: "" },
    { name: "", phone: "" }
  ])
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("safeguard_user")
    if (!userData) {
      router.push("/login")
      return
    }
    
    // Load existing contacts
    const savedContacts = localStorage.getItem("safeguard_contacts")
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [router])

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const newContacts = [...contacts]
    newContacts[index][field] = value
    setContacts(newContacts)
  }

  const addContact = () => {
    if (contacts.length < 5) {
      setContacts([...contacts, { name: "", phone: "" }])
    }
  }

  const removeContact = (index: number) => {
    if (contacts.length > 1) {
      const newContacts = contacts.filter((_, i) => i !== index)
      setContacts(newContacts)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Filter out empty contacts
    const validContacts = contacts.filter(c => c.name && c.phone)
    
    // Save to localStorage
    localStorage.setItem("safeguard_contacts", JSON.stringify(validContacts))
    
    // Update user data with contacts
    const userData = localStorage.getItem("safeguard_user")
    if (userData) {
      const user = JSON.parse(userData)
      user.emergencyContacts = validContacts.map(c => c.phone)
      localStorage.setItem("safeguard_user", JSON.stringify(user))
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSaving(false)
    setSavedMessage("Contacts saved successfully!")
    setTimeout(() => setSavedMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Emergency Contacts</h1>
          <p className="text-muted-foreground">
            Add up to 5 emergency contacts who will be notified when you trigger an SOS alert
          </p>
        </div>

        <div className="space-y-6">
          {contacts.map((contact, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl p-6 border border-border card-soft"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm text-primary font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {index === 0 ? "Primary Contact" : `Contact ${index + 1}`}
                  </span>
                </div>
                {contacts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeContact(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`} className="text-foreground">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={`name-${index}`}
                      placeholder="Contact name"
                      value={contact.name}
                      onChange={(e) => handleContactChange(index, "name", e.target.value)}
                      className="pl-10 h-11 rounded-xl bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`phone-${index}`} className="text-foreground">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={`phone-${index}`}
                      type="tel"
                      placeholder="Phone number"
                      value={contact.phone}
                      onChange={(e) => handleContactChange(index, "phone", e.target.value)}
                      className="pl-10 h-11 rounded-xl bg-background border-border"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {contacts.length < 5 && (
            <button
              onClick={addContact}
              className="w-full p-4 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-5 w-5" />
              Add Another Contact
            </button>
          )}

          <div className="flex items-center justify-between pt-4">
            {savedMessage && (
              <p className="text-sm text-primary font-medium">{savedMessage}</p>
            )}
            <div className="ml-auto">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl px-8"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Contacts"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
