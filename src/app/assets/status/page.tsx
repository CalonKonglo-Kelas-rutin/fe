"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  MapPin, 
  Clock, 
  MessageSquare,
  ArrowRight,
  Shield,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationStatus, VerificationTimeline } from "@/types/asset";

// Mock data
const mockAsset = {
  id: "AST-2024-001",
  name: "18K Gold Rolex Submariner",
  type: "Jewelry & Precious Metals",
  estimatedValue: 15000,
  status: "verifying" as VerificationStatus,
  submittedAt: "2024-11-18T10:30:00Z",
  trackingNumber: "TRK-8472938",
};

const timelineEvents: VerificationTimeline[] = [
  {
    status: "submitted",
    timestamp: "2024-11-18 10:30 AM",
    description: "Asset registration submitted successfully",
    completedBy: "System",
  },
  {
    status: "in-transit",
    timestamp: "2024-11-18 02:15 PM",
    description: "Asset picked up by logistics partner",
    completedBy: "Swift Logistics",
  },
  {
    status: "at-pawnshop",
    timestamp: "2024-11-19 09:00 AM",
    description: "Asset delivered to Golden Trust Pawnshop",
    completedBy: "Swift Logistics",
  },
  {
    status: "verifying",
    timestamp: "2024-11-19 11:45 AM",
    description: "Physical verification and authenticity check in progress",
    completedBy: "Senior Appraiser - John Smith",
  },
  {
    status: "appraising",
    timestamp: "",
    description: "Professional appraisal and valuation pending",
  },
  {
    status: "approved",
    timestamp: "",
    description: "Final approval and tokenization eligibility",
  },
];

const messages = [
  {
    id: 1,
    from: "Golden Trust Pawnshop",
    message: "Your asset has been received and initial inspection looks good. Full appraisal in progress.",
    timestamp: "2024-11-19 11:50 AM",
    isRead: true,
  },
  {
    id: 2,
    from: "System",
    message: "Reminder: You can track your asset status in real-time on this page.",
    timestamp: "2024-11-19 10:00 AM",
    isRead: true,
  },
];

export default function AssetStatusPage() {
  const currentStepIndex = timelineEvents.findIndex(
    (event) => event.status === mockAsset.status
  );

  const formattedEvents = timelineEvents.map((event, index) => ({
    status: event.status,
    label: event.description,
    timestamp: event.timestamp,
    description: event.completedBy ? `Completed by: ${event.completedBy}` : undefined,
    isCompleted: index < currentStepIndex,
    isCurrent: index === currentStepIndex,
  }));

  return (
    <MainLayout
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Status", href: "/assets/status" },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6 py-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{mockAsset.name}</h1>
            <p className="text-muted-foreground">Asset ID: {mockAsset.id}</p>
          </div>
          <StatusBadge status={mockAsset.status} className="text-base px-4 py-2" />
        </div>

        {/* Asset Overview Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Value</p>
                <p className="text-2xl font-bold text-accent">
                  ${mockAsset.estimatedValue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-accent/10">
                <Package className="h-5 w-5 text-accent" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                <p className="text-lg font-mono font-medium">
                  {mockAsset.trackingNumber}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-info/10">
                <MapPin className="h-5 w-5 text-info" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                <p className="text-lg font-medium">
                  {new Date(mockAsset.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <GlassCard gradient className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Verification Timeline</h2>
                <Badge variant="outline" className="gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Live Updates
                </Badge>
              </div>

              <Timeline events={formattedEvents} />

              {/* Current Status Info */}
              <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Current Status: Physical Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Our certified appraiser is conducting a thorough examination of your asset,
                      including authenticity verification, condition assessment, and detailed
                      documentation. This process typically takes 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pawnshop Info */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-success/10">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Partner Pawnshop</h3>
                  <p className="text-sm text-muted-foreground">Verified & Trusted</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">Golden Trust Pawnshop</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">Manhattan, NY</p>
                </div>
                <div>
                  <p className="text-muted-foreground">License</p>
                  <p className="font-mono text-xs">LIC-NY-8472</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4" size="sm">
                View Credentials
              </Button>
            </GlassCard>

            {/* Messages */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Updates & Messages</h3>
                <Badge variant="secondary">{messages.length}</Badge>
              </div>

              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "p-3 rounded-lg border transition-colors cursor-pointer",
                      msg.isRead
                        ? "bg-muted/30 border-border"
                        : "bg-accent/5 border-accent/20"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{msg.from}</p>
                      {!msg.isRead && (
                        <div className="h-2 w-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {msg.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                  </div>
                ))}
              </div>

              <Button variant="ghost" className="w-full mt-4 gap-2" size="sm">
                <MessageSquare className="h-4 w-4" />
                View All Messages
              </Button>
            </GlassCard>

            {/* Next Steps */}
            <GlassCard className="p-6 bg-linear-to-br from-accent/10 to-primary/5">
              <h3 className="font-semibold mb-3">What Happens Next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>Appraisal completion (24-48 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>Final value determination</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>Tokenization eligibility approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>Receive notification to proceed</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* Action Bar */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <p className="text-sm text-muted-foreground">
                You will be notified when the next stage begins
              </p>
            </div>
            <Button variant="outline">
              Need Help?
            </Button>
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
}
