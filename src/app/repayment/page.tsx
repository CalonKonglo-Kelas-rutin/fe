"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Calendar,
  TrendingDown,
  Package,
  Shield,
  AlertCircle,
  Info,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { RepaymentSchedule } from "@/types/asset";

// Mock data
const loanData = {
  loanId: "LOAN-2024-001",
  assetId: "AST-2024-001",
  assetName: "18K Gold Rolex Submariner",
  tokenId: "RWA-ROLEX-001",
  principalAmount: 11550,
  interestRate: 8.5,
  totalOwed: 12531,
  remainingBalance: 12531,
  paidAmount: 0,
  status: "active" as const,
  nextPaymentDate: "2024-12-20",
  nextPaymentAmount: 1025,
};

const repaymentSchedule: RepaymentSchedule[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date("2024-12-20");
  date.setMonth(date.getMonth() + i);
  
  return {
    paymentNumber: i + 1,
    dueDate: date.toISOString().split("T")[0],
    amount: 1025,
    principal: 962.5,
    interest: 62.5,
    status: i === 0 ? "pending" : "pending",
  };
});

export default function RepaymentPage() {
  const [paymentAmount, setPaymentAmount] = useState(loanData.nextPaymentAmount.toString());
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
  };

  const isFullPayment = Number(paymentAmount) >= loanData.remainingBalance;
  const earlyPaymentSavings = isFullPayment ? loanData.totalOwed - loanData.remainingBalance : 0;

  if (showSuccess) {
    return (
      <MainLayout
        breadcrumbs={[
          { label: "Repayment", href: "/repayment" },
          { label: "Success", href: "/repayment" },
        ]}
      >
        <div className="max-w-4xl mx-auto space-y-6 py-12">
          <GlassCard
            gradient
            className="p-12 text-center bg-linear-to-br from-success/10 via-accent/5 to-primary/5"
          >
            <div className="inline-flex p-4 rounded-full bg-success/20 mb-6">
              <CheckCircle2 className="h-16 w-16 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
            <p className="text-muted-foreground mb-8">
              Your payment has been processed successfully
            </p>

            <div className="max-w-md mx-auto space-y-4 mb-8">
              <div className="p-4 rounded-lg bg-card/50 border">
                <p className="text-sm text-muted-foreground mb-1">Payment Amount</p>
                <p className="text-3xl font-bold text-accent">
                  ${Number(paymentAmount).toLocaleString()}
                </p>
              </div>

              {isFullPayment && (
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-success" />
                    <p className="font-semibold text-success">Loan Fully Repaid!</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your asset is now available for retrieval from secure storage
                  </p>
                </div>
              )}

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction Hash</span>
                  <span className="font-mono text-xs">0xabc...def</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining Balance</span>
                  <span className="font-bold">
                    ${(loanData.remainingBalance - Number(paymentAmount)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 max-w-md mx-auto">
              <Button variant="outline" className="flex-1">
                View Receipt
              </Button>
              {isFullPayment ? (
                <Button className="flex-1 bg-success hover:bg-success/90 gap-2">
                  <Package className="h-4 w-4" />
                  Retrieve Asset
                </Button>
              ) : (
                <Button className="flex-1 bg-accent hover:bg-accent/90">
                  Back to Dashboard
                </Button>
              )}
            </div>
          </GlassCard>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      breadcrumbs={[
        { label: "Repayment", href: "/repayment" },
        { label: "Make Payment", href: "/repayment" },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6 py-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Loan Repayment</h1>
            <p className="text-muted-foreground">
              Manage your loan and asset retrieval
            </p>
          </div>
          <StatusBadge status={loanData.status} className="text-base px-4 py-2" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Loan Overview */}
            <GlassCard gradient className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1">{loanData.assetName}</h2>
                <p className="text-sm text-muted-foreground">
                  Asset ID: {loanData.assetId} • Token: {loanData.tokenId}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-card/50 border">
                  <p className="text-sm text-muted-foreground mb-1">Total Owed</p>
                  <p className="text-2xl font-bold text-destructive">
                    ${loanData.totalOwed.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border">
                  <p className="text-sm text-muted-foreground mb-1">Paid So Far</p>
                  <p className="text-2xl font-bold text-success">
                    ${loanData.paidAmount.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border">
                  <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                  <p className="text-2xl font-bold">
                    ${loanData.remainingBalance.toLocaleString()}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Payment Form */}
            <GlassCard gradient className="p-6">
              <h3 className="text-xl font-semibold mb-6">Make a Payment</h3>

              <div className="space-y-6">
                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="pl-7 text-lg font-semibold"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPaymentAmount(loanData.nextPaymentAmount.toString())}
                    >
                      Min Payment
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPaymentAmount(loanData.remainingBalance.toString())}
                    >
                      Pay in Full
                    </Button>
                  </div>
                </div>

                {/* Payment Preview */}
                <div className="p-4 rounded-lg bg-muted/30 border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Amount</span>
                    <span className="font-bold">
                      ${Number(paymentAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Balance</span>
                    <span className="font-bold">
                      ${(loanData.remainingBalance - Number(paymentAmount)).toFixed(2)}
                    </span>
                  </div>
                  {isFullPayment && earlyPaymentSavings > 0 && (
                    <div className="flex justify-between pt-2 border-t text-success">
                      <span className="font-medium">Early Payment Savings</span>
                      <span className="font-bold">
                        ${earlyPaymentSavings.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Full Payoff Notice */}
                {isFullPayment && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-success mb-1">
                          Complete Loan Payoff
                        </p>
                        <p className="text-muted-foreground">
                          This payment will fully settle your loan. Your asset will be
                          immediately available for retrieval from secure storage.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="p-4 rounded-lg border bg-card/50 flex items-center justify-between cursor-pointer hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <CreditCard className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">USDC (Wallet)</p>
                        <p className="text-xs text-muted-foreground">
                          Balance: $11,550
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-accent hover:bg-accent/90 gap-2"
                    onClick={handlePayment}
                    disabled={isProcessing || Number(paymentAmount) <= 0}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Confirm Payment
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </GlassCard>

            {/* Repayment Schedule */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold mb-4">Repayment Schedule</h3>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {repaymentSchedule.map((payment) => {
                  const isPending = payment.status === "pending";
                  const isNextDue = payment.paymentNumber === 1;

                  return (
                    <div
                      key={payment.paymentNumber}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border transition-all",
                        isNextDue && "bg-accent/5 border-accent/40",
                        !isNextDue && "bg-card/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                            isNextDue && "bg-accent text-accent-foreground",
                            !isNextDue && "bg-muted text-muted-foreground"
                          )}
                        >
                          #{payment.paymentNumber}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {new Date(payment.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Principal: ${payment.principal} • Interest: ${payment.interest}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${payment.amount}</p>
                        {isNextDue && (
                          <Badge variant="secondary" className="text-xs">
                            Due Next
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Info & Actions */}
          <div className="space-y-6">
            {/* Next Payment */}
            <GlassCard className="p-6 bg-linear-to-br from-warning/10 to-accent/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Calendar className="h-5 w-5 text-warning" />
                </div>
                <h3 className="font-semibold">Next Due</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className="text-3xl font-bold">
                    ${loanData.nextPaymentAmount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                  <p className="text-lg font-medium">
                    {new Date(loanData.nextPaymentDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-warning">30 days remaining</p>
                </div>
              </div>
            </GlassCard>

            {/* Early Payoff Benefits */}
            <GlassCard className="p-6 bg-linear-to-br from-success/5 to-accent/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-success/10">
                  <TrendingDown className="h-5 w-5 text-success" />
                </div>
                <h3 className="font-semibold">Pay Off Early</h3>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>Save on remaining interest</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>Retrieve your asset immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>No early payment penalties</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setPaymentAmount(loanData.remainingBalance.toString())}
              >
                <Sparkles className="h-4 w-4" />
                Calculate Payoff
              </Button>
            </GlassCard>

            {/* Asset Info */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Your Asset</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Collateral</p>
                  <p className="font-medium">{loanData.assetName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Token ID</p>
                  <p className="font-mono text-xs">{loanData.tokenId}</p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Shield className="h-4 w-4 text-success" />
                  <p className="text-xs text-muted-foreground">
                    Securely stored and fully insured
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Important Notice */}
            <GlassCard className="p-4 bg-info/5 border-info/20">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-info mb-2">Payment Terms</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Payments are non-refundable</li>
                    <li>• Late fees apply after due date</li>
                    <li>• Partial payments accepted</li>
                    <li>• Auto-pay available in settings</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
