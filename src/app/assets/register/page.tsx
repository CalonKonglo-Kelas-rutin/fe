"use client";

import { useState, useCallback } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssetType, AssetCondition } from "@/types/asset";

const assetTypes: { value: AssetType; label: string }[] = [
  { value: "jewelry", label: "Jewelry & Precious Metals" },
  { value: "electronics", label: "Electronics" },
  { value: "vehicle", label: "Vehicle" },
  { value: "real-estate", label: "Real Estate" },
  { value: "collectibles", label: "Collectibles & Art" },
  { value: "luxury-items", label: "Luxury Items" },
  { value: "other", label: "Other" },
];

const conditionOptions: {
  value: AssetCondition;
  label: string;
  description: string;
}[] = [
  {
    value: "excellent",
    label: "Excellent",
    description: "Like new, no visible wear",
  },
  { value: "good", label: "Good", description: "Minor wear, fully functional" },
  {
    value: "fair",
    label: "Fair",
    description: "Moderate wear, works properly",
  },
  { value: "poor", label: "Poor", description: "Heavy wear, may need repairs" },
];

const steps = [
  { label: "Asset Details", description: "Basic information" },
  { label: "Upload Photos", description: "Visual documentation" },
  { label: "Review & Submit", description: "Confirm details" },
];

export default function RegisterAssetPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    type: "" as AssetType,
    name: "",
    description: "",
    estimatedValue: "",
    condition: "" as AssetCondition,
    purchaseDate: "",
    purchasePrice: "",
    serialNumber: "",
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return (
        formData.type &&
        formData.name &&
        formData.description &&
        formData.estimatedValue &&
        formData.condition
      );
    }
    if (currentStep === 1) {
      return uploadedImages.length >= 2;
    }
    return true;
  };

  return (
    <MainLayout
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Register New Asset", href: "/assets/register" },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-8 py-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Register Your Asset
          </h1>
          <p className="text-muted-foreground text-lg">
            Start your journey to tokenized liquidity
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        {currentStep === 0 && (
          <GlassCard gradient hover className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Asset Information
                </h2>
                <p className="text-muted-foreground mb-6">
                  Provide detailed information about the asset you wish to
                  tokenize
                </p>
              </div>

              <div className="grid gap-6">
                {/* Asset Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as AssetType })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Asset Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Asset Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., 18K Gold Rolex Submariner"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the asset..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Estimated Value & Condition */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Estimated Value (USD) *</Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="10000"
                      value={formData.estimatedValue}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          estimatedValue: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          condition: value as AssetCondition,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditionOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div>
                              <div className="font-medium">{opt.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {opt.description}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                    Optional Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="purchaseDate">Purchase Date</Label>
                      <Input
                        id="purchaseDate"
                        type="date"
                        value={formData.purchaseDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            purchaseDate: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purchasePrice">
                        Purchase Price (USD)
                      </Label>
                      <Input
                        id="purchasePrice"
                        type="number"
                        placeholder="8000"
                        value={formData.purchasePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            purchasePrice: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serialNumber">Serial/ID Number</Label>
                      <Input
                        id="serialNumber"
                        placeholder="ABC123456"
                        value={formData.serialNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serialNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {currentStep === 1 && (
          <GlassCard gradient hover className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Upload Asset Photos
                </h2>
                <p className="text-muted-foreground mb-6">
                  Upload at least 2 high-quality photos of your asset from
                  different angles
                </p>
              </div>

              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                  "relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer group",
                  dragActive
                    ? "border-accent bg-accent/5 scale-[1.02]"
                    : "border-border hover:border-accent/50 hover:bg-accent/5"
                )}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Upload className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      Drop files here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports: JPG, PNG, WebP (Max 10MB each)
                    </p>
                  </div>
                </div>
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">
                      Uploaded Images ({uploadedImages.length})
                    </h3>
                    {uploadedImages.length >= 2 && (
                      <div className="flex items-center text-success text-sm">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Minimum requirement met
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden border bg-muted"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-destructive/90 hover:bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        )}

        {currentStep === 2 && (
          <GlassCard gradient hover className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Review & Submit</h2>
                <p className="text-muted-foreground mb-6">
                  Please review your asset details before submission
                </p>
              </div>

              <div className="space-y-6">
                {/* Asset Summary */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Asset Type
                      </p>
                      <p className="font-medium">
                        {
                          assetTypes.find((t) => t.value === formData.type)
                            ?.label
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Asset Name
                      </p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Description
                      </p>
                      <p className="text-sm">{formData.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Value
                      </p>
                      <p className="font-medium text-2xl text-accent">
                        ${Number(formData.estimatedValue).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Condition</p>
                      <p className="font-medium">
                        {
                          conditionOptions.find(
                            (c) => c.value === formData.condition
                          )?.label
                        }
                      </p>
                    </div>
                    {formData.serialNumber && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Serial Number
                        </p>
                        <p className="font-mono text-sm">
                          {formData.serialNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images Preview */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Uploaded Photos ({uploadedImages.length})
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden border"
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Notice */}
                <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center text-info">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Next Steps
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>
                      • Your asset will be reviewed by our verification team
                    </li>
                    <li>
                      • You will receive instructions for offline delivery to
                      the pawnshop
                    </li>
                    <li>
                      • The pawnshop will conduct physical verification and
                      appraisal
                    </li>
                    <li>• Once approved, you can proceed with tokenization</li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
              className="bg-accent hover:bg-accent/90"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Handle submission
                console.log("Submitting asset...", formData);
              }}
              className="bg-accent hover:bg-accent/90"
            >
              Submit Asset
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
