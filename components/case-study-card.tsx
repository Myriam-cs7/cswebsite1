import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CaseStudyCardProps {
  title: string
  client: string
  description: string
  results: {
    label: string
    value: string
  }[]
  image: string
  link: string
}

export default function CaseStudyCard({ title, client, description, results, image, link }: CaseStudyCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={client}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-[#cfaa5c] text-black text-xs font-medium px-2.5 py-1 rounded-full">Case Study</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-playfair text-xl font-bold mb-1 text-[#cfaa5c]">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{client}</p>
        <p className="text-white text-sm mb-6">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {results.map((result, index) => (
            <div key={index} className="text-center">
              <p className="text-[#cfaa5c] text-xl font-bold">{result.value}</p>
              <p className="text-xs text-gray-400">{result.label}</p>
            </div>
          ))}
        </div>

        <Button
          href={link}
          className="w-full bg-transparent border border-[#cfaa5c] text-[#cfaa5c] hover:bg-[#cfaa5c] hover:text-black group-hover:bg-[#cfaa5c] group-hover:text-black transition-colors"
        >
          View Case Study
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
