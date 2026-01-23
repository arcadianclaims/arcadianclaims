"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        alert('Failed to send message. Please try again or contact us directly.')
        console.error('Submission error:', result.error)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again or contact us directly.')
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center space-y-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Message Sent Successfully!</h2>
              <p className="text-lg text-muted-foreground">
                Thank you for contacting Arcadian Claims Services. We'll get back to you as soon as possible.
              </p>
              <Button onClick={() => (window.location.href = "/")}>Return to Homepage</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Get in Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Reach out to our team for general inquiries, partnership opportunities, or questions about our
                  services.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Office Address</h3>
                      <p className="text-muted-foreground">
                        Po Box 113
                        <br />
                        Opp, AL 36467
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <a href="tel:4709486221" className="text-muted-foreground hover:text-primary transition-colors">
                        470-948-6221
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <a href="mailto:newclaims@arcadianclaims.com" className="text-muted-foreground hover:text-primary transition-colors">
                        newclaims@arcadianclaims.com
                      </a>
                    </div>
                  </CardContent>
                </Card>


                {/* Google Maps Embed */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27395.88397843619!2d-86.27012905!3d31.2826541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x889097f1b6a80001%3A0x8e7a7e0d5f5f5f5f!2sOpp%2C%20AL%2036467!5e0!3m2!1sen!2sus!4v1705000000000!5m2!1sen!2sus"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Arcadian Claims Location - Opp, AL"
                    />
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      required
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="How can we help you?"
                      rows={6}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
