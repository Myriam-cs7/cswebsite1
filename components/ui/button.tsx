import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#D4AF37] text-black hover:bg-[#CDAF27] rounded-full",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-full",
        secondary: "bg-[#1A1A1A] text-white hover:bg-[#333333] rounded-full",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  target?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, target, ...props }, ref) => {
    // Si un href est fourni, rendre un lien
    if (href) {
      // Vérifier si c'est un lien externe
      const isExternal = href.startsWith("http") || href.startsWith("https") || href.startsWith("//")

      if (isExternal) {
        return (
          <a
            href={href}
            target={target || "_blank"}
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant, size, className }))}
          >
            {props.children}
          </a>
        )
      } else {
        // Lien interne avec Next.js Link
        return (
          <Link href={href} className={cn(buttonVariants({ variant, size, className }))}>
            {props.children}
          </Link>
        )
      }
    }

    // Sinon, rendre un bouton normal
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
