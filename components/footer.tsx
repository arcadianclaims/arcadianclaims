import Link from "next/link"
import { Facebook, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              <span className="text-foreground">Arcadian</span>
              <span className="text-primary"> Claims</span>
            </h3>
            <p className="text-sm text-muted-foreground">Fast, accurate appraisals. Anywhere, anytime.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/submit-claim" className="text-muted-foreground hover:text-primary transition-colors">
                  Submit Claim
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📍 Po Box 113, Opp, AL 36467</li>
              <li>☎ 470-948-6221</li>
              <li>✉ newclaims@arcadianclaims.com</li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-1 text-xs text-muted-foreground">
            <Link href="/privacy" className="block hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>


        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Arcadian Claims Services. All Rights Reserved.</p>
        </div>
      </div>
    </footer >
  )
}
