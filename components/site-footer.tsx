"use client"

import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
               <span className="text-2xl font-playfair font-bold text-white">
                 c<span className="text-[#cfaa5c]">AI</span>re
               </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The first AI Concierge dedicated to Luxury Spas & Aesthetic Clinics. Based in Dubai & Paris.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#cfaa5c] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-[#cfaa5c] transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#features" className="hover:text-[#cfaa5c] transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-[#cfaa5c] transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-[#cfaa5c] transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#about-us" className="hover:text-[#cfaa5c] transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#cfaa5c] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-[#cfaa5c] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#cfaa5c] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2025 cAIre Solutions. All rights reserved.</p>
          <p>Designed with excellence for Dubai.</p>
        </div>
      </div>
    </footer>
  )
}
