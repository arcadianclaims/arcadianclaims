import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Arcadian Claims Services",
  description: "Privacy policy for Arcadian Claims Services.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground">
            <strong>Last Updated:</strong> January 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
            <p>
              Arcadian Claims Services collects information that you provide directly to us when submitting claims or
              contacting us. This may include your name, email address, phone number, vehicle information, and
              supporting documentation related to your claim.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
            <p>
              We use the information we collect to process your claims, communicate with you about our services, and
              improve our operations. We do not sell or share your personal information with third parties except as
              necessary to fulfill our services or as required by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at newclaims@arcadianclaims.com or call
              470-948-6221.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
