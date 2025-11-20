"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  Loader2,
  TrendingUp,
  Shield
} from "lucide-react";
import type { VerificationStatus, LoanStatus } from "@/types/asset";

interface StatusBadgeProps {
  status: VerificationStatus | LoanStatus;
  className?: string;
  showIcon?: boolean;
}

const verificationStatusConfig: Record<
  VerificationStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  draft: {
    label: "Draft",
    variant: "outline",
    icon: Clock,
    className: "border-muted-foreground/30 text-muted-foreground",
  },
  submitted: {
    label: "Submitted",
    variant: "secondary",
    icon: TrendingUp,
    className: "bg-info/10 text-info border-info/20",
  },
  "in-transit": {
    label: "In Transit",
    variant: "secondary",
    icon: Loader2,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  "at-pawnshop": {
    label: "At Pawnshop",
    variant: "secondary",
    icon: Shield,
    className: "bg-info/10 text-info border-info/20",
  },
  verifying: {
    label: "Verifying",
    variant: "secondary",
    icon: Loader2,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  appraising: {
    label: "Appraising",
    variant: "secondary",
    icon: Loader2,
    className: "bg-accent/10 text-accent border-accent/20",
  },
  approved: {
    label: "Approved",
    variant: "default",
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/20",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  tokenized: {
    label: "Tokenized",
    variant: "default",
    icon: CheckCircle2,
    className: "bg-accent/10 text-accent border-accent/20",
  },
};

const loanStatusConfig: Record<
  LoanStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  active: {
    label: "Active",
    variant: "default",
    icon: TrendingUp,
    className: "bg-success/10 text-success border-success/20",
  },
  overdue: {
    label: "Overdue",
    variant: "destructive",
    icon: AlertCircle,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  paid: {
    label: "Paid",
    variant: "default",
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/20",
  },
  defaulted: {
    label: "Defaulted",
    variant: "destructive",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const config = (verificationStatusConfig[status as VerificationStatus] || 
                  loanStatusConfig[status as LoanStatus]);

  if (!config) return null;

  const Icon = config.icon;
  const isSpinning = status === "verifying" || status === "appraising" || status === "in-transit";

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "px-3 py-1 font-medium border transition-all duration-300",
        config.className,
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn("h-3.5 w-3.5 mr-1.5", {
            "animate-spin": isSpinning,
          })}
        />
      )}
      {config.label}
    </Badge>
  );
}
