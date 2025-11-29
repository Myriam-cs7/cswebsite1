"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email"
      }
    } else if (step === 2) {
      if (!formData.company.trim()) newErrors.company = "Company name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) return

    setIsSubmitting(true)

    // Simuler un envoi de formulaire
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-[#1A1A1A] border border-[#cfaa5c]/30 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-[#cfaa5c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-[#cfaa5c]" />
        </div>
        <h3 className="text-2xl font-playfair font-bold text-[#cfaa5c] mb-4">Thank You!</h3>
        <p className="text-white mb-6">
          Your message has been received. One of our experts will contact you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setFormData({ name: "", email: "", company: "", message: "" })
            setStep(1)
            setIsSubmitted(false)
          }}
          className="bg-[#cfaa5c] text-black hover:bg-white"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#cfaa5c]/30 rounded-lg p-8">
      <h3 className="text-2xl font-playfair font-bold text-[#cfaa5c] mb-6">Contact Us</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-white">
                Your Name <span className="text-[#cfaa5c]">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`bg-[#2A2A2A] border-[#cfaa5c]/30 text-white ${
                  errors.name ? "border-red-500" : "focus:border-[#cfaa5c]"
                }`}
                placeholder="John Doe"
                autoFocus
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-white">
                Email Address <span className="text-[#cfaa5c]">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-[#2A2A2A] border-[#cfaa5c]/30 text-white ${
                  errors.email ? "border-red-500" : "focus:border-[#cfaa5c]"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="pt-4">
              <Button type="button" onClick={nextStep} className="w-full bg-[#cfaa5c] text-black hover:bg-white">
                Next Step
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2">
              <label htmlFor="company" className="block text-white">
                Company Name <span className="text-[#cfaa5c]">*</span>
              </label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`bg-[#2A2A2A] border-[#cfaa5c]/30 text-white ${
                  errors.company ? "border-red-500" : "focus:border-[#cfaa5c]"
                }`}
                placeholder="Your Company"
                autoFocus
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-white">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-[#2A2A2A] border-[#cfaa5c]/30 text-white focus:border-[#cfaa5c]"
                placeholder="Tell us about your needs..."
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="flex-1 border-[#cfaa5c] text-[#cfaa5c] hover:bg-[#cfaa5c] hover:text-black"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 bg-[#cfaa5c] text-black hover:bg-white" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
