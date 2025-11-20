// Asset Types for RWA Tokenization Platform

export type AssetType = 
  | "jewelry"
  | "electronics"
  | "vehicle"
  | "real-estate"
  | "collectibles"
  | "luxury-items"
  | "other";

export type AssetCondition = "excellent" | "good" | "fair" | "poor";

export type VerificationStatus = 
  | "draft"
  | "submitted"
  | "in-transit"
  | "at-pawnshop"
  | "verifying"
  | "appraising"
  | "approved"
  | "rejected"
  | "tokenized";

export type LoanStatus = 
  | "active"
  | "overdue"
  | "paid"
  | "defaulted";

export interface Asset {
  id: string;
  userId: string;
  type: AssetType;
  name: string;
  description: string;
  estimatedValue: number;
  appraisedValue?: number;
  condition: AssetCondition;
  images: string[];
  purchaseDate?: string;
  purchasePrice?: number;
  serialNumber?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  approvedAt?: string;
  tokenId?: string;
}

export interface VerificationTimeline {
  status: VerificationStatus;
  timestamp: string;
  description: string;
  completedBy?: string;
  notes?: string;
}

export interface PawnshopVerification {
  pawnshopId: string;
  pawnshopName: string;
  verifierName: string;
  verificationDate: string;
  appraisedValue: number;
  condition: AssetCondition;
  notes: string;
  photos: string[];
  certificateUrl?: string;
}

export interface TokenizedAsset {
  assetId: string;
  tokenId: string;
  tokenSymbol: string;
  contractAddress: string;
  chainId: number;
  mintedAt: string;
  totalSupply: number;
  liquidityPoolAddress?: string;
}

export interface LoanDetails {
  loanId: string;
  assetId: string;
  tokenId: string;
  principalAmount: number;
  interestRate: number;
  loanTerm: number; // in days
  disbursedAmount: number;
  disbursedAt: string;
  dueDate: string;
  status: LoanStatus;
  repaidAmount: number;
  remainingBalance: number;
  nextPaymentDate?: string;
  nextPaymentAmount?: number;
}

export interface RepaymentSchedule {
  paymentNumber: number;
  dueDate: string;
  amount: number;
  principal: number;
  interest: number;
  status: "pending" | "paid" | "overdue";
  paidAt?: string;
}

export interface Transaction {
  id: string;
  type: "disbursement" | "repayment" | "tokenization" | "liquidation";
  amount: number;
  currency: string;
  timestamp: string;
  txHash?: string;
  status: "pending" | "confirmed" | "failed";
  fromAddress?: string;
  toAddress?: string;
}

export interface AssetFormData {
  type: AssetType;
  name: string;
  description: string;
  estimatedValue: number;
  condition: AssetCondition;
  purchaseDate?: string;
  purchasePrice?: number;
  serialNumber?: string;
  images: File[];
}
