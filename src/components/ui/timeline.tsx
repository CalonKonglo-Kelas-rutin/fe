"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TimelineEvent {
  status: string;
  label: string;
  timestamp?: string;
  description?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="space-y-6">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;

          return (
            <div key={event.status} className="relative flex gap-4">
              {/* Timeline Line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-5 top-12 bottom-0 w-0.5 -translate-x-1/2 transition-all duration-500",
                    event.isCompleted ? "bg-accent" : "bg-border"
                  )}
                />
              )}

              {/* Timeline Node */}
              <div className="relative shrink-0">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    {
                      "border-accent bg-accent text-accent-foreground":
                        event.isCompleted && !event.isCurrent,
                      "border-primary bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30":
                        event.isCurrent,
                      "border-border bg-background text-muted-foreground":
                        !event.isCompleted && !event.isCurrent,
                    }
                  )}
                >
                  {event.isCompleted && !event.isCurrent ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-current" />
                  )}
                </div>

                {event.isCurrent && (
                  <>
                    <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                    <span className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                  </>
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className={cn("font-semibold", {
                      "text-foreground": event.isCurrent || event.isCompleted,
                      "text-muted-foreground": !event.isCurrent && !event.isCompleted,
                    })}
                  >
                    {event.label}
                  </h4>
                  {event.timestamp && (
                    <span className="text-xs text-muted-foreground">
                      {event.timestamp}
                    </span>
                  )}
                </div>
                {event.description && (
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
