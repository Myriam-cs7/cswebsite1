"use client"

import { useState, useEffect, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function ColorPicker({ color, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentColor, setCurrentColor] = useState(color || "#000000")
  const inputRef = useRef(null)

  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  const handleColorChange = (e) => {
    const newColor = e.target.value
    setCurrentColor(newColor)
    onChange(newColor)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-10 h-10 rounded-md border overflow-hidden"
          style={{ backgroundColor: currentColor }}
          aria-label="Pick a color"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div>
          <input
            ref={inputRef}
            type="color"
            value={currentColor}
            onChange={handleColorChange}
            className="w-32 h-32 cursor-pointer"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
