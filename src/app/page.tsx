import { MainLayout } from "@/components/layouts/main-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Package,
  Wallet,
  Clock,
  Plus,
  Sparkles,
  Shield,
  Activity,
  DollarSign,
  Coins
} from "lucide-react";
import Link from "next/link";

// Mock data for dashboard
const stats = {
  totalAssetValue: 16500,
  activeLoans: 1,
  availableCredit: 11550,
  totalRepaid: 0,
};

const activeAssets = [
  {
    id: "AST-2024-001",
    name: "18K Gold Rolex Submariner",
    status: "tokenized" as const,
    value: 16500,
    loanAmount: 11550,
    nextPayment: "2024-12-20",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "disbursement",
    description: "Loan funds disbursed",
    amount: 11550,
    timestamp: "2024-11-20",
  },
  {
    id: 2,
    type: "tokenization",
    description: "Asset tokenized successfully",
    amount: 0,
    timestamp: "2024-11-20",
  },
  {
    id: 3,
    type: "approval",
    description: "Asset verification approved",
    amount: 16500,
    timestamp: "2024-11-19",
  },
];

export default function Page() {
  return (
    <MainLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
      ]}
    >
      <div className="space-y-6 my-6 mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl border bg-card">
          <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="relative p-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                Welcome to ChainCredit
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Transform your physical assets into instant liquidity through blockchain tokenization
              </p>
              <div className="flex gap-3">
                <Button size="lg" className="bg-accent hover:bg-accent/90 gap-2" asChild>
                  <Link href="/assets/register">
                    <Plus className="h-5 w-5" />
                    Register New Asset
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/wallet">
                    <Wallet className="h-5 w-5" />
                    View Wallet
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <GlassCard hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <Badge variant="secondary" className="text-xs">Assets</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Asset Value</p>
            <p className="text-3xl font-bold text-accent">
              ${stats.totalAssetValue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              +16% from last month
            </p>
          </GlassCard>

          <GlassCard hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Active Loans</p>
            <p className="text-3xl font-bold">{stats.activeLoans}</p>
            <p className="text-xs text-muted-foreground mt-2">
              All in good standing
            </p>
          </GlassCard>

          <GlassCard hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-success/10">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <Badge variant="secondary" className="text-xs">Credit</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Available Credit</p>
            <p className="text-3xl font-bold text-success">
              ${stats.availableCredit.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              70% LTV on assets
            </p>
          </GlassCard>

          <GlassCard hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-info/10">
                <Coins className="h-5 w-5 text-info" />
              </div>
              <Badge variant="secondary" className="text-xs">Paid</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Repaid</p>
            <p className="text-3xl font-bold">${stats.totalRepaid.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2">
              On-time payments: 100%
            </p>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Assets */}
          <div className="lg:col-span-2">
            <GlassCard gradient className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Assets</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/assets/register">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {activeAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-4 rounded-lg border bg-card/50 hover:border-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{asset.name}</h3>
                          <StatusBadge status={asset.status} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Asset ID: {asset.id}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Asset Value</p>
                        <p className="font-semibold text-accent">
                          ${asset.value.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                        <p className="font-semibold">
                          ${asset.loanAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Next Payment</p>
                        <p className="font-semibold">{asset.nextPayment}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link href="/wallet">View Details</Link>
                      </Button>
                      <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90" asChild>
                        <Link href="/repayment">Make Payment</Link>
                      </Button>
                    </div>
                  </div>
                ))}

                {activeAssets.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">No Assets Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start by registering your first asset
                    </p>
                    <Button className="bg-accent hover:bg-accent/90 gap-2" asChild>
                      <Link href="/assets/register">
                        <Plus className="h-4 w-4" />
                        Register Asset
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/assets/register">
                    <Plus className="h-4 w-4" />
                    Register New Asset
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/assets/status">
                    <Clock className="h-4 w-4" />
                    Track Status
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/repayment">
                    <TrendingUp className="h-4 w-4" />
                    Make Payment
                  </Link>
                </Button>
              </div>
            </GlassCard>

            {/* Recent Activity */}
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 text-sm">
                    <div className="p-1.5 rounded-lg bg-accent/10 mt-0.5">
                      <Activity className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {activity.amount > 0 && (
                      <span className="text-xs font-semibold text-success">
                        ${activity.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Platform Info */}
            <GlassCard className="p-6 bg-linear-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">Why ChainCredit?</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>Secure & insured asset storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>Instant blockchain liquidity</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>Transparent on-chain records</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>Flexible repayment terms</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
