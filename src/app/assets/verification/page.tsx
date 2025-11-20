"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Award,
  FileText,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Download
} from "lucide-react";
import type { VerificationStatus } from "@/types/asset";

// Mock data
const mockVerification = {
  assetId: "AST-2024-001",
  assetName: "18K Gold Rolex Submariner",
  status: "approved" as VerificationStatus,
  estimatedValue: 15000,
  appraisedValue: 16500,
  pawnshop: {
    name: "Golden Trust Pawnshop",
    verifier: "John Smith",
    license: "LIC-NY-8472",
    rating: 4.9,
  },
  verificationDate: "2024-11-20",
  certificateId: "CERT-2024-001-GT",
  condition: "Excellent",
  authenticity: "Verified Genuine",
  notes: "18K gold case and bracelet in excellent condition. Automatic movement functioning perfectly. All original documentation present. Serial number verified with manufacturer.",
  images: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
  ],
};

const loanTerms = {
  maxLoanAmount: 11550, // 70% of appraised value
  interestRate: 8.5,
  termMonths: 12,
  monthlyPayment: 1025,
};

export default function VerificationResultPage() {
  const valueIncrease =
    ((mockVerification.appraisedValue - mockVerification.estimatedValue) /
      mockVerification.estimatedValue) *
    100;

  return (
    <MainLayout
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Verification Result", href: "/assets/verification" },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6 py-6">
        {/* Success Banner */}
        <GlassCard
          gradient
          className="p-8 bg-linear-to-br from-success/10 via-accent/5 to-primary/5 border-success/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-success/20">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Asset Approved! 🎉</h1>
                  <p className="text-muted-foreground">
                    Your asset has been successfully verified and is eligible for tokenization
                  </p>
                </div>
                <StatusBadge status={mockVerification.status} className="text-base px-4 py-2" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Appraisal Value Card */}
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard gradient className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-xl font-semibold">Professional Appraisal</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Your Estimated Value
                </p>
                <p className="text-2xl font-bold text-muted-foreground line-through">
                  ${mockVerification.estimatedValue.toLocaleString()}
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-accent/20 to-success/20 rounded-lg blur-xl" />
                <div className="relative">
                  <p className="text-sm text-muted-foreground mb-1">
                    Appraised Value
                  </p>
                  <div className="flex items-end gap-3">
                    <p className="text-5xl font-bold text-accent">
                      ${mockVerification.appraisedValue.toLocaleString()}
                    </p>
                    <Badge className="mb-2 bg-success/10 text-success border-success/20">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{valueIncrease.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Condition</p>
                    <p className="font-medium">{mockVerification.condition}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Authenticity</p>
                    <p className="font-medium flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5 text-success" />
                      {mockVerification.authenticity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard gradient className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Verification Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Verified By</p>
                <p className="font-semibold">{mockVerification.pawnshop.name}</p>
                <p className="text-sm text-muted-foreground">
                  Appraiser: {mockVerification.pawnshop.verifier}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Verification Date</p>
                  <p className="font-medium">
                    {new Date(mockVerification.verificationDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificate ID</p>
                  <p className="font-mono text-xs">{mockVerification.certificateId}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Appraiser Notes</p>
                <p className="text-sm leading-relaxed">{mockVerification.notes}</p>
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Certificate
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Verification Photos */}
        <GlassCard className="p-6">
          <h3 className="font-semibold mb-4">Professional Documentation</h3>
          <div className="grid grid-cols-3 gap-4">
            {mockVerification.images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-video rounded-lg overflow-hidden border bg-muted"
              >
                <div className="w-full h-full bg-linear-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Verification Photo {idx + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Loan Terms Preview */}
        <GlassCard gradient className="p-6 bg-linear-to-br from-primary/5 to-accent/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/10">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Available Liquidity</h2>
              <p className="text-sm text-muted-foreground">
                Based on your appraised asset value
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-card/50 border">
              <p className="text-sm text-muted-foreground mb-1">Max Loan Amount</p>
              <p className="text-2xl font-bold text-accent">
                ${loanTerms.maxLoanAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">70% LTV</p>
            </div>

            <div className="p-4 rounded-lg bg-card/50 border">
              <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
              <p className="text-2xl font-bold">{loanTerms.interestRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">Annual</p>
            </div>

            <div className="p-4 rounded-lg bg-card/50 border">
              <p className="text-sm text-muted-foreground mb-1">Loan Term</p>
              <p className="text-2xl font-bold">{loanTerms.termMonths} mo</p>
              <p className="text-xs text-muted-foreground mt-1">Flexible</p>
            </div>

            <div className="p-4 rounded-lg bg-card/50 border">
              <p className="text-sm text-muted-foreground mb-1">Est. Monthly</p>
              <p className="text-2xl font-bold">
                ${loanTerms.monthlyPayment.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Payment</p>
            </div>
          </div>

          <div className="p-4 bg-info/10 border border-info/20 rounded-lg mb-6">
            <h4 className="font-medium mb-2 text-info">How Tokenization Works</h4>
            <ul className="text-sm space-y-1.5 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>Your physical asset is securely stored with our partner</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>
                  A digital token representing your asset is minted on the blockchain
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>
                  Token is used as collateral through Kamino liquidity protocol
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>
                  Receive stablecoin liquidity instantly to your wallet
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>Repay to reclaim your asset anytime</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 gap-2">
              <Sparkles className="h-5 w-5" />
              Proceed to Tokenization
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Review Terms
            </Button>
          </div>
        </GlassCard>

        {/* Security Notice */}
        <GlassCard className="p-4 bg-card/50">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-success" />
            <p className="text-sm text-muted-foreground">
              Your asset is fully insured and stored in a secure, climate-controlled facility.
              All transactions are recorded on-chain for complete transparency.
            </p>
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
}
