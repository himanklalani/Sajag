"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BlurRevealProps {
  className?: string
  children: React.ReactNode
  delay?: number
  duration?: number
  isActive?: boolean
}

export function BlurReveal({
  className,
  children,
}: BlurRevealProps) {
  return (
    <span className={cn("inline-block", className)}>
      {children}
    </span>
  )
}

interface TextWordBlurRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delayOffset?: number;
  duration?: number;
  isActive?: boolean;
}

export function TextWordBlurReveal({
  text,
  className,
}: TextWordBlurRevealProps) {
  return (
    <p className={className}>
      {text}
    </p>
  )
}