import { ClaimForm } from "@/components/claim-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submit a Claim | Arcadian Claims Services",
  description:
    "Submit your appraisal claim quickly and easily. Fast, secure claim submission for auto, equipment, and specialty vehicle appraisals.",
}

export default function SubmitClaimPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 lg:px-8">
        <ClaimForm />
      </div>
    </div>
  )
}
