import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { Car, Truck, Scale, FileText, Handshake, Clock, Shield, Globe, Zap, ArrowRight } from "lucide-react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <BackgroundRippleEffect />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex items-center justify-center min-h-[90vh]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Fast, Accurate Appraisals
              </h1>
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-2 flex items-center justify-center gap-2">
                <span className="text-primary">Anywhere,</span>
                <TypewriterEffect
                  words={[{ text: "Anytime", className: "text-primary" }]}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                  cursorClassName="bg-primary"
                />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
              Combining industry expertise with cutting-edge technology to streamline your claims
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/submit-claim">
                  Submit Your Claim
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/services">Learn About Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Comprehensive appraisal solutions for any claim, vehicle, or equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Desk Appraisals */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Desk Appraisals & Reviews</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Remote appraisals by reviewing photos and estimates. Fast, cost-effective assessments without on-site
                  visits.
                </p>
              </CardContent>
            </Card>

            {/* Auto Appraisals */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Auto Appraisals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive damage appraisals for automobiles, motorcycles, and light trucks using modern estimating
                  software.
                </p>
              </CardContent>
            </Card>

            {/* Classic Vehicles */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Classic Vehicle Appraisals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specialized appraisals for classic, antique, and exotic vehicles accounting for rarity and market
                  trends.
                </p>
              </CardContent>
            </Card>

            {/* Heavy Equipment */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Heavy Equipment Appraisals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Expert appraisals for heavy machinery, commercial trucks, and agricultural equipment with detailed
                  reports.
                </p>
              </CardContent>
            </Card>

            {/* Diminished Value */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Diminished Value Assessments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Quantify lost market value post-repair to ensure fair compensation for your vehicle.
                </p>
              </CardContent>
            </Card>

            {/* Appraisal Clause */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Appraisal Clause Services</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Neutral, professional appraisal services for insurance disputes with impartial valuations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Arcadian */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Arcadian</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Your trusted partner for fast, accurate, and reliable claims appraisals
            </p>
            <p className="text-lg font-semibold text-primary">
              We have independent licensed appraisers-adjusters on staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Nationwide Coverage</h3>
              <p className="text-muted-foreground leading-relaxed">
                Licensed appraisers serving all 50 states with consistent quality
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Quick Turnaround</h3>
              <p className="text-muted-foreground leading-relaxed">
                Claims handled in hours, not days. Fast response when you need it most
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Advanced Technology</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cutting-edge tools and software for accurate, efficient appraisals
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Expert Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experienced professionals dedicated to accuracy and customer satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-pretty">
            Submit your claim today and experience the Arcadian difference
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/submit-claim">
              Submit Your Claim Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div >
  )
}
