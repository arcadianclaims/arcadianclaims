import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Car, Truck, Scale, FileText, Handshake, CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | Arcadian Claims Services",
  description:
    "Comprehensive appraisal services including auto, heavy equipment, classic vehicles, diminished value, desk reviews, and appraisal clause services.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Any claim, anytime, anywhere. Professional appraisal solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 space-y-20">
          {/* Desk Appraisals */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Desk Appraisals, Audits & Reviews</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Arcadian can perform appraisals remotely by reviewing photos and estimates, providing quick assessments
                without a physical inspection. This desk review service ensures existing repair estimates are accurate
                and fair, catching any oversights. We also provide comprehensive audits.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Cost-effective remote appraisals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Quick turnaround time without on-site visits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Second opinion on existing estimates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Comprehensive audits and reviews</span>
                </li>
              </ul>
            </div>
            <Card>
              <CardContent className="p-8">
                <img
                  src="/professional-reviewing-documents-and-photos-on-com.jpg"
                  alt="Desk appraisal review"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Auto Appraisals */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="md:order-2">
              <CardContent className="p-8">
                <img
                  src="/damaged-car-being-inspected-by-professional.jpg"
                  alt="Auto damage appraisal"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
            <div className="space-y-6 md:order-1">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Auto Appraisals</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Comprehensive damage appraisals for standard automobiles. Our experienced auto appraisers assess
                collision damage and repair costs for cars, motorcycles, and light trucks using modern estimating
                software like CCC One.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Expert collision damage assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Modern estimating software for accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Prompt, reliable appraisal reports</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Classic Vehicles */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-16 w-16 rounded-lg bg-accent/10 flex items-center justify-center">
                <Car className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-4xl font-bold">Classic Vehicle Appraisals</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Specialized appraisal services for classic, antique, and exotic vehicles. These vehicles often have very
                different valuations and require expertise to appraise correctly, accounting for factors like rarity,
                restoration, and market trends.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>Expertise in vintage and exotic vehicles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>Rarity and restoration value assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>Market trend analysis for accurate valuations</span>
                </li>
              </ul>
            </div>
            <Card>
              <CardContent className="p-8">
                <img
                  src="/classic-vintage-car-being-appraised.jpg"
                  alt="Classic vehicle appraisal"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Heavy Equipment */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="md:order-2">
              <CardContent className="p-8">
                <img
                  src="/heavy-construction-equipment-excavator-being-inspe.jpg"
                  alt="Heavy equipment appraisal"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
            <div className="space-y-6 md:order-1">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Heavy Equipment Appraisals</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Damage and value appraisals for heavy machinery, commercial trucks, agricultural equipment, and other
                specialty equipment. From construction machinery to tractor-trailers, we employ appraisers knowledgeable
                in heavy equipment.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Construction, agricultural, and commercial equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Specialized tools for accurate estimates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Detailed repair cost and market value reports</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Diminished Value */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-16 w-16 rounded-lg bg-accent/10 flex items-center justify-center">
                <Scale className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-4xl font-bold">Diminished Value Assessments</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Evaluations of lost market value of a vehicle post-repair. After an accident is repaired, the vehicle
                may be worth less than before. Arcadian quantifies that loss so that owners can claim fair compensation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>Calculate loss in market value after repair</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>Accurate and defensible DV reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>Help recover full compensation</span>
                </li>
              </ul>
            </div>
            <Card>
              <CardContent className="p-8">
                <img
                  src="/vehicle-value-assessment-with-calculator-and-chart.jpg"
                  alt="Diminished value assessment"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Appraisal Clause */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="md:order-2">
              <CardContent className="p-8">
                <img
                  src="/professional-handshake-agreement-appraisal-meeting.jpg"
                  alt="Appraisal clause services"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
            <div className="space-y-6 md:order-1">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Handshake className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Appraisal Clause Services</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Neutral, professional appraisal services for insurance disputes. When an insured and insurer disagree on
                the amount of a loss, the policy's appraisal clause can be invoked. Arcadian can act as an appraiser or
                umpire to help resolve disputes fairly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Impartial dispute resolution services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Act as appraiser or umpire</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>Industry best practices for fair resolution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Need an Appraisal?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-pretty">
            Get started with your claim today and experience fast, accurate service
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/submit-claim">
              Submit Your Claim
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
