import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Arcadian Claims Services",
  description: "Terms of service for Arcadian Claims Services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground">
            <strong>Last Updated:</strong> January 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Acceptance of Terms</h2>
            <p>
              By accessing and using Arcadian Claims Services website and services, you agree to be bound by these Terms
              of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Services</h2>
            <p>
              Arcadian Claims Services provides professional appraisal services for vehicles, equipment, and related
              insurance claims. All appraisals are conducted by qualified professionals in accordance with industry
              standards.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Limitations of Liability</h2>
            <p>
              Arcadian Claims Services provides appraisals based on the information available at the time of inspection.
              While we strive for accuracy, we are not liable for any decisions made based on our appraisals beyond the
              scope of our direct services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
            <p>For questions about these terms, please contact us at newclaims@arcadianclaims.com or call 470-948-6221.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
