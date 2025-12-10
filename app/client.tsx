import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Section Hero */}
      <section className="relative w-full py-20 lg:py-32 bg-background overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8 mx-auto">
          
          {/* 1. Top-Center Élégant : Dubaï - Paris */}
          <p className="text-sm md:text-base font-medium uppercase tracking-[0.3em] text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-1000">
            Dubaï — Paris
          </p>

          {/* 2. Le Titre Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Your new unfair advantage in{' '}
            <span className="text-primary relative whitespace-nowrap">
              beauty & wellness
              <span className="absolute inset-x-0 bottom-1 h-3 bg-primary/20 -z-10 skew-x-12"></span>
            </span>
          </h1>

          {/* 3. Le Sous-titre */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            Your smartest way to increase bookings, loyalty, and product sales without extra staff.
          </p>

          {/* 4. Les Boutons d'appel à l'action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button size="lg" className="gap-2 font-semibold text-base px-8 h-12 rounded-full">
              See WhatsApp Automation in Action
            </Button>
            
            <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-full">
              Explore Solutions
            </Button>
          </div>

          {/* 5. L'image Hero (Tes téléphones cAire) */}
          <div className="mt-16 relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 animate-in fade-in zoom-in duration-1000 delay-700">
            {/* L'image doit être placée dans le dossier public et nommée hero-phones.png */}
            <Image 
              src="/hero-phones.png" 
              alt="cAire Solution WhatsApp Automation Interface" 
              width={1200} 
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

        </div>
      </section>
    </main>
  )
}
