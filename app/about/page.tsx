import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Target, Users, Globe, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Arcadian Claims Services",
  description:
    "Learn about Arcadian Claims Services - our mission, experience, and commitment to providing fast, accurate appraisals with cutting-edge technology.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              About Arcadian Claims Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Streamlining the claims process with industry expertise and cutting-edge technology
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Arcadian Claims Services, we are committed to streamlining the claims process and driving customer
                satisfaction by leveraging advanced technology and our expert staff. We believe in providing fast, fair
                appraisals that help our clients make informed decisions with confidence.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our guiding principle is simple: deliver accurate assessments with exceptional service, ensuring every
                client receives the attention and expertise their claim deserves.
              </p>
            </div>
            <Card>
              <CardContent className="p-8">
                <img
                  src="/placeholder.svg?height=400&width=600&key=mission"
                  alt="Arcadian team mission"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience & Expertise</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Decades of combined experience in insurance appraisals
            </p>
            <p className="text-lg font-semibold text-primary">
              We have independent licensed appraisers-adjusters on staff.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Qualified Team</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our appraisers bring over 50+ years of combined experience in auto and equipment appraisals, with
                  I-CAR training, state licenses, and industry certifications.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Continuous Training</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We stay up-to-date with the latest industry training, technology, and best practices to ensure the
                  highest quality service for every claim.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Industry Standards</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Partnered with leading estimating platforms and committed to following industry best practices for
                  accurate, defensible appraisals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Geographic Coverage */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="md:order-2">
              <CardContent className="p-8">
                <img
                  src="/placeholder.svg?height=400&width=600&key=coverage"
                  alt="Nationwide coverage map"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
            <div className="space-y-6 md:order-1">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Nationwide Coverage</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Arcadian Claims Services proudly serves clients across all 50 states. Whether you need a field
                inspection or remote desk appraisal, we have the network and capabilities to handle claims anywhere in
                the country.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our combination of local expertise and nationwide reach ensures consistent quality and fast turnaround
                times, no matter where your claim is located.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Sets Us Apart</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Arcadian difference: expertise, technology, and personalized service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-background rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Comprehensive Services</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  From standard auto appraisals to complex heavy equipment and classic vehicles, we handle it all under
                  one roof.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-background rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Flexible Options</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Both field inspections and desk appraisals available, providing speed and flexibility to meet your
                  needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-background rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Cutting-Edge Technology</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Advanced estimating software and modern tools ensure accuracy and efficiency in every appraisal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-background rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Personalized Service</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every claim receives individual attention from experienced professionals dedicated to your
                  satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Partner With Arcadian Today</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-pretty">
            Experience the difference that expertise and technology make
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/submit-claim">
                Submit a Claim
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
