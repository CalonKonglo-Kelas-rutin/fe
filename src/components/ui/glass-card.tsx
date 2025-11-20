"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  gradient?: boolean;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  title,
  description,
  gradient = false,
  hover = false,
}: GlassCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border backdrop-blur-xl transition-all duration-300",
        gradient && "bg-linear-to-br from-card/80 via-card/60 to-card/40",
        !gradient && "bg-card/70",
        hover && "hover:scale-[1.02] hover:shadow-2xl hover:border-accent/50",
        className
      )}
    >
      {/* Web3 Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, currentColor 1px, transparent 1px),
              linear-gradient(180deg, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Gradient Accent */}
      {gradient && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      )}

      {title && (
        <CardHeader className="relative">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm">{description}</CardDescription>
          )}
        </CardHeader>
      )}

      <CardContent className="relative">
        {children}
      </CardContent>
    </Card>
  );
}
